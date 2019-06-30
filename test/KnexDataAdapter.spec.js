const should = require('chai').should()
const KnexDataAdapter = require('../src/adapters/KnexDataAdapter')
const config = require('../src/config.json')['test']

describe('KnexDataAdapter.spec Tests', function() {
  it('create new instnce', function() {
    let adapter = new KnexDataAdapter(config.db.pg)
    adapter.should.be.an('object')
  })

  it('connect to database', function(done) {
    let adapter = new KnexDataAdapter(config.db.pg)
    adapter.connect().then(result => {
      console.log(typeof result)
      result.should.be.an('function')
      done()
    })
  })

  it('insert object', function(done) {
    let adapter = new KnexDataAdapter(config.db.pg)
    adapter
      .connect()
      .then(() => {
        return adapter._db.schema.dropTable('test')
      })
      .then(() => {
        return adapter._db.schema.createTable('test', function(table) {
          table.increments()
          table.integer('test')
          table.timestamps()
        })
      })
      .then(() => {
        return adapter.insert('test', { test: 1 })
      })
      .then(response => {
        response.should.be.an('array')
        done()
      })
  })

  it('delete object', function(done) {
    let adapter = new KnexDataAdapter(config.db.pg)
    adapter
      .connect()
      .then(() => {
        return adapter._db.schema.dropTable('test')
      })
      .then(() => {
        return adapter._db.schema.createTable('test', function(table) {
          table.increments()
          table.integer('test')
          table.timestamps()
        })
      })
      .then(() => {
        return adapter.insert('test', { test: 1 })
      })
      .then(response => {
        return adapter.remove('test', response[0])
      })
      .then(response => {
        response.should.equal(1)
        done()
      })
  })

  it('queryOne to return one', function(done) {
    let adapter = new KnexDataAdapter(config.db.pg)
    adapter
      .connect()
      .then(() => {
        return adapter._db.schema.dropTable('test')
      })
      .then(() => {
        return adapter._db.schema.createTable('test', function(table) {
          table.increments()
          table.integer('test')
          table.timestamps()
        })
      })
      .then(() => {
        return adapter.insert('test', { test: 1 })
      })
      .then(() => {
        return adapter.queryOne('test', { test: 1 })
      })
      .then(response => {
        response.length.should.equal(1)
        done()
      })
  })
})
