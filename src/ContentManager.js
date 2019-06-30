const Joi = require('@hapi/joi')

class ContentManager {
  constructor(dataAdapter, eventEmitter) {
    this._dataAdapter = dataAdapter
    this._eventEmitter = eventEmitter
  }

  async insert(collection, item) {
    try {
      if (collection !== 'contenttype') {
        let contenttype = await this._dataAdapter.queryOne('contenttype', {
          collectionName: collection
        })
        if (!contenttype) {
          throw Error(`Collection with name ${collection} does not exists.`)
        }

        if (contenttype.fields && contenttype.fields.length > 0) {
          let schemaObject = {}
          contenttype.fields.forEach(f => {
            switch (f.type) {
              case 'String':
                schemaObject[f.id] = Joi.string()
                break
              case 'DateTime':
                schemaObject[f.id] = Joi.date()
                break
            }
            if (f.required) {
              if (schemaObject[f.id]) {
                schemaObject[f.id] = schemaObject[f.id].required()
              } else {
                schemaObject[f.id] = Joi.required()
              }
            }
          })
          const schema = Joi.object().keys(schemaObject)

          const { error } = Joi.validate(item, schema)
          if (error) {
            return { invalid: true, error: error }
          }
        }
      }

      this._eventEmitter.emit(
        'content-event',
        `before:insert:${collection}`,
        collection,
        item
      )
      let result = await this._dataAdapter.insert(collection, item)
      this._eventEmitter.emit(`after:insert:${collection}`, collection, result)
      return result
    } catch (err) {
      throw Error(err)
    }
  }

  update(collection, item) {}

  async remove(collection, id) {
    return this._dataAdapter.remove(collection, id)
  }

  async getAll(collection) {
    return this._dataAdapter.getAll(collection)
  }

  async get(collection, id) {
    return this._dataAdapter.get(collection, id)
  }

  async createTable(collection, fields) {
    return this._dataAdapter.createTable(collection, fields)
  }

  query(collection, query) {}

  async queryOne(collection, query) {
    return this._dataAdapter.queryOne(collection, query)
  }
}

module.exports = ContentManager
