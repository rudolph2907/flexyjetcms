const express = require('express')
const router = express.Router()

router
  .route('/:collection')
  .get(async (req, res, next) => {
    try {
      res.send(await req.app.ContentManager.getAll(req.params.collection))
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      res.send(
        await req.app.ContentManager.insert(req.params.collection, req.body)
      )
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

router.route('/:collection/:id').get(async (req, res, next) => {
  try {
    res.send(
      await req.app.ContentManager.get(req.params.collection, req.params.id)
    )
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
