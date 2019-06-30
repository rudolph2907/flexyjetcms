class ContentType {
  constructor(contentManager, collection, fields, singular, plural) {
    this._collectionName = collection
    this._contentManager = contentManager
    this._fields = fields
    this._singular = singular
    this._plural = plural
    this._storeName = 'contenttype'
  }

  get fields() {
    return this._fields
  }

  set fields(value) {
    this._fields = value
  }

  async register(createTable) {
    try {
      if (createTable) {
        await this._contentManager.createTable(
          this._collectionName,
          this._fields
        )
      }

      let contentType = await this._contentManager.queryOne(this._storeName, {
        collectionName: this._collectionName
      })
      if (!contentType) {
        await this._contentManager.insert(this._storeName, {
          fields: createTable /* SQL */
            ? JSON.stringify(this._fields)
            : this._fields,
          singular: this._singular,
          plural: this._plural,
          collectionName: this._collectionName
        })
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async unregister() {
    try {
      let contentType = await this._contentManager.queryOne(this._storeName, {
        collectionName: this._collectionName
      })
      if (!contentType) {
        await this._contentManager.remove(contentType._id)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async insert(item) {}

  update(item) {}

  remove(item) {}

  getAll(item) {}

  get(id) {}

  query(id) {}
}

module.exports = ContentType
