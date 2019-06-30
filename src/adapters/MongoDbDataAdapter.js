var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

class MongoDbDataAdapter {
  constructor(connectionstring) {
    this._connectionstring = connectionstring
    this._connection = null
    this._db = null
  }

  async connect() {
    try {
      this._connection = await MongoClient.connect(this._connectionstring, {
        useNewUrlParser: true
      })
      this._db = this._connection.db(this._connection.dbName)
      return this._db
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async insert(collection, item) {
    try {
      return await this._db.collection(collection).insertOne(item)
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async update(collection, item) {}

  async remove(collection, id) {
    try {
      return await this._db.collection(collection).deleteOne({ _id: id })
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async getAll(collection) {
    try {
      return await this._db
        .collection(collection)
        .find({})
        .toArray()
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async get(collection, id) {
    try {
      return await this.queryOne(collection, { _id: new ObjectId(id) })
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }

  async query(collection, query) {}

  async queryOne(collection, query) {
    try {
      return await this._db.collection(collection).findOne(query)
    } catch (err) {
      console.log(err)
      throw Error(err)
    }
  }
}

module.exports = MongoDbDataAdapter
