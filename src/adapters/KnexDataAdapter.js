class KnexDataAdapter {
  constructor(config) {
    this._config = config
  }

  async connect() {
    try {
      this._db = require('knex')({
        client: 'pg',
        connection: {
          host: this._config.host,
          user: this._config.user,
          password: this._config.password,
          database: this._config.database
        }
      })
      return this._db
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async insert(collection, item) {
    try {
      return await this._db(collection).insert(item, 'id')
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async update(collection, item) {}

  async remove(collection, id) {
    try {
      return await this._db(collection)
        .where('id', id)
        .del()
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async getAll(collection) {
    try {
      return await this._db(collection).select()
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async get(collection, id) {
    try {
      return await this.queryOne(collection, { id: id })
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async query(collection, query) {}

  async createTable(collection, fields) {
    let exists = await this._db.schema.hasTable(collection)
    if (!exists) {
      return this._db.schema.createTable(collection, t => {
        t.increments('id').primary()
        fields.forEach(field => {
          switch (field.type) {
            case 'String':
              t.string(field.id, 255)
              break
            case 'JSON':
              t.json(field.id)
              break
            case 'DateTime':
              t.datetime(field.id)
              break
          }
        })
      })
    }
  }

  async queryOne(collection, query) {
    try {
      return await this._db(collection)
        .where(query)
        .select()
        .first()
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }
}

module.exports = KnexDataAdapter
