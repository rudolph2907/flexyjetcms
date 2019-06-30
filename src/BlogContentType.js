const ContentType = require('./ContentType')

class BlogContentType extends ContentType {
  constructor(contentManager) {
    super(
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
    )
  }
}

module.exports = BlogContentType
