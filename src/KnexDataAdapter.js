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

  async getAll(collection) {}

  async get(collection, id) {}

  async query(collection, query) {}

  async queryOne(collection, query) {
    try {
      return await this._db(collection)
        .where(query)
        .select()
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }
}

module.exports = KnexDataAdapter
