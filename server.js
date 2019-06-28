const ContentManager = require('./ContentManager');
let MongoDbDataAdapter = require('./MongoDbDataAdapter');
let ContentType = require('./ContentType');
const config = require('./config.json')['development'];
const events = require('events');

let mongoDbDataAdapter = new MongoDbDataAdapter(config.db.connectionstring);
let eventEmitter = new events.EventEmitter();

// eventEmitter.on('before:insert:contenttype', item => {
//   console.log(item);
// });

mongoDbDataAdapter.connect().then(function() {
  let contentManager = new ContentManager(mongoDbDataAdapter, eventEmitter);
  let contentTypes = new ContentType(
    contentManager,
    'contenttype',
    [],
    'Content Type',
    'Content Types'
  );
  contentTypes.register();

  let blogPosts = new ContentType(
    contentManager,
    'blogpost',
    [
      {
        label: 'Title',
        id: 'title',
        type: 'String',
        required: true
      },
      {
        label: 'Content',
        id: 'content',
        type: 'String'
      },
      {
        label: 'Slug',
        id: 'slug',
        type: 'String',
        required: true
      },
      {
        label: 'Create Date',
        id: 'createdate',
        type: 'DateTime',
        default: 'timestamp',
        required: true
      },
      {
        label: 'Publish Date',
        id: 'publishdate',
        type: 'DateTime'
      }
    ],
    'Blog Post',
    'Blog Posts'
  );
  blogPosts.register().then(i => {
    contentManager
      .insert('blogpost', {
        title: 'Hello',
        content: 'Yo',
        createdate: new Date()
      })
      .then(result => {
        console.log(result);
      });
  });
});
