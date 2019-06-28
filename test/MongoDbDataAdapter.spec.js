const should = require('chai').should();
const MongoDbDataAdapter = new require('../MongoDbDataAdapter');
const config = require('../config.json')['test'];

describe('MongoDbDataAdapter Tests', function() {
  it('create new instnce', function() {
    let adapter = new MongoDbDataAdapter(config.db.connectionstring);
    adapter._connectionstring.should.equal(config.db.connectionstring);
  });

  it('connect to database', function(done) {
    let adapter = new MongoDbDataAdapter(config.db.connectionstring);
    adapter.connect().then(result => {
      result.should.be.an('object');
      done();
    });
  });

  it('insert object', function(done) {
    let adapter = new MongoDbDataAdapter(config.db.connectionstring);
    adapter
      .connect()
      .then(() => {
        return adapter.insert('test', { test: 1 });
      })
      .then(response => {
        response.result.n.should.equal(1);
        done();
      });
  });

  it('delete object', function(done) {
    let adapter = new MongoDbDataAdapter(config.db.connectionstring);
    adapter
      .connect()
      .then(() => {
        return adapter.insert('test', { test: 1 });
      })
      .then(response => {
        return adapter.remove('test', response.insertedId);
      })
      .then(response => {
        response.result.n.should.equal(1);
        done();
      });
  });

  it('queryOne to return one', function(done) {
    let adapter = new MongoDbDataAdapter(config.db.connectionstring);
    adapter
      .connect()
      .then(() => {
        return adapter.insert('test', { test: 1 });
      })
      .then(() => {
        return adapter.queryOne('test', { test: 1 });
      })
      .then(response => {
        response.test.should.equal(1);
        done();
      });
  });
});
