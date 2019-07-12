const express = require('express')
const router = express.Router()

router.hooks = {
  blogpost: {
    before: [
      (req, res, next) => {
        if (!req.query.key) {
          next({
            message: 'You need an API key',
            status: 401
          })
        }
        next()
      },
      (req, res, next) => {
        console.log('Before request 2')
        next()
      }
    ],
    after: []
  }
}

router.use('/:collection', (req, res, next) => {
  let run = (index, handlers) => {
    if (index < handlers.length) {
      handlers[index](req, res, function(err) {
        if (err) {
          return next(err)
        }
        index += 1
        run(index, handlers)
      })
    } else {
      next()
    }
  }
  if (
    req.params.collection &&
    router.hooks &&
    router.hooks[req.params.collection]
  ) {
    run(0, router.hooks[req.params.collection].before)
  }
  console.log('Before request')
  // next()
})

// router.use('/:collection', function(req, res, next) {
//   if (
//     req.params.collection &&
//     router.hooks &&
//     router.hooks[req.params.collection]
//   ) {
//     console.log(router.hooks[req.params.collection].before.length)
//     invokeMiddleware(router.hooks[req.params.collection].before)
//   }
//   console.log('Before request')
//   next()
// })

router
  .route('/:collection')
  .get(async (req, res, next) => {
    try {
      req.data = await req.app.ContentManager.getAll(req.params.collection)
      next()
    } catch (err) {
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      res.send(
        await req.app.ContentManager.insert(req.params.collection, req.body)
      )
      next()
    } catch (err) {
      next(err)
    }
  })

router.route('/:collection/:id').get(async (req, res, next) => {
  try {
    res.send(
      await req.app.ContentManager.get(req.params.collection, req.params.id)
    )
  } catch (err) {
    next(err)
  }
})

router.use('/:collection', (req, res, next) => {
  let run = (index, handlers) => {
    if (index < handlers.length) {
      handlers[index](req, res, function(err) {
        if (err) {
          return next(err)
        }
        index += 1
        run(index, handlers)
      })
    } else {
      res.send(req.data)
    }
  }
  if (
    req.params.collection &&
    router.hooks &&
    router.hooks[req.params.collection]
  ) {
    run(0, router.hooks[req.params.collection].after)
  } else {
    res.send(req.data)
  }
  console.log('after request')
  // next()
})

module.exports = router
