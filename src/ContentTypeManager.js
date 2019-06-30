class ContentTypeManager {
  constructor(contentManager) {
    this._contentManager = contentManager
    this._db = this._contentManager._dataAdapter._db
    this._storeName = 'contenttype'
  }

  async register() {
    return this._contentManager.createTable(this._storeName, [
      { id: 'fields', type: 'JSON' },
      { id: 'singular', type: 'String' },
      { id: 'plural', type: 'String' },
      { id: 'collectionName', type: 'String' }
    ])
  }

  async unregister() {}
}

module.exports = ContentTypeManager
