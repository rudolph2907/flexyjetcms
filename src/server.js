const ContentManager = require('./ContentManager')

let ContentType = require('./ContentType')
let ContentTypeManager = require('./ContentTypeManager')
let BlogContentType = require('./BlogContentType')
const config = require('./config.json')['development']
const events = require('events')
const logger = require('./config/logger')
const app = require('./config/express')
const env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')
const port = (process.env.PORT = process.env.PORT || '3002')

let adapter = null
switch (config.db.adapter) {
  case 'mongodb':
    let MongoDbDataAdapter = require('./adapters/MongoDbDataAdapter')
    adapter = new MongoDbDataAdapter(config.db.mongodb.connectionstring)
    break
  case 'pg':
    let KnexDataAdapter = require('./adapters/KnexDataAdapter')
    adapter = new KnexDataAdapter(config.db.pg)
}

let eventEmitter = new events.EventEmitter()

// eventEmitter.on('before:insert:contenttype', item => {
//   console.log(item);
// });

adapter.connect().then(async () => {
  let contentManager = new ContentManager(adapter, eventEmitter)
  app.ContentManager = contentManager
  let contentTypes = new ContentType(
    contentManager,
    'contenttype',
    [],
    'Content Type',
    'Content Types'
  )
  contentTypes.register()

  if (config.db[config.db.adapter].createTable) {
    let contentTypeManager = new ContentTypeManager(contentManager)
    await contentTypeManager.register()
  }

  let blogPosts = new BlogContentType(contentManager)
  blogPosts.register(config.db[config.db.adapter].createTable).then(i => {
    contentManager
      .insert('blogpost', {
        title: 'Hello',
        content: 'Yo',
        slug: 'yo',
        createdate: new Date()
      })
      .then(result => {
        console.log(result)
      })
  })

  app.listen(port, () => logger.info(`Server started on port ${port} (${env})`))
})
