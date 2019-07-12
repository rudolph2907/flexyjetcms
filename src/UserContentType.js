const ContentType = require('./ContentType')

class UserContentType extends ContentType {
  constructor(contentManager) {
    super(
      contentManager,
      'user',
      [
        {
          label: 'First Name',
          id: 'firstname',
          type: 'String',
          required: true
        },
        {
          label: 'Surname',
          id: 'lastname',
          type: 'String',
          required: true
        },
        {
          label: 'Email',
          id: 'email',
          type: 'String',
          required: true
        },
        {
          label: 'Password',
          id: 'password',
          type: 'String',
          required: true
        },
        {
          label: 'Date Registered',
          id: 'dateregistered',
          type: 'DateTime',
          default: 'timestamp',
          required: true
        }
      ],
      'Blog Post',
      'Blog Posts'
    )
  }
}

module.exports = UserContentType
