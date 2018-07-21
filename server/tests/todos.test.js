const request = require('supertest');
const expect = require('expect');

var {Todo} = require('./../models/Todo.js');   //   ./ - represents current directory and ../ represents one level uper directories
var {app} = require('./../server.js');

// This function will be called for each test
beforeEach((done) => {
  Todo.remove({}).then( () => done() );   // This will wipe all records inside the todos database
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
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
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
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e) );
      });
  });
});
