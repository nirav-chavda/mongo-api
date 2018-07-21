const request = require('supertest');
const expect = require('expect');

var {Todo} = require('./../models/Todo.js');   //   ./ - represents current directory and ../ represents one level uper directories
var {app} = require('./../server.js');
var {ObjectId} = require('mongodb');

var todos = [{
  '_id' : new ObjectId(),
  'text' : 'Note one'
},{
  '_id' : new ObjectId(),
  'text' : 'Note two'
}];

// This function will be called for each test
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then( () => done() );   // This will wipe all records inside the todos database
});

describe('Post /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'Created a test todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if(err) {
          return done(err);
        }

        // Using model we can get all todos in form of an array
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch( (err) => {
          done(err);
        });
      });
  });

  it('should not create a new todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e) );
      });
  });
});

describe('Get /todos', () => {
  it('should return all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.docs.length).toBe(2);
      })
      .end(done);
  });
});

describe('Get /todos/:id', () => {

  it('should return a todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id not valid', (done) => {
    request(app)
      .get(`/todos/${new ObjectId().toHexString()}12`)
      .expect(404)
      .end(done);
  });

});
