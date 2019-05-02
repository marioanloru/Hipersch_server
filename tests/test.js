var assert = require('assert');
//  var app = require('../src/app.js');
var supertest = require('supertest');

//  Library related tests
/*describe('Film', () => {
  //  Checks for a right load of the library
  describe('Load', () => {
    it('Film library should be loaded correctly', () => {
      assert(Film, "Loaded");
    })
  });
  //  Creation of a filmt est
  describe('Creation', () => {
    it('Film should be created correctly', () => {
      var fecha = new Date(1995,6,23);
      var new_film = new Film('Pocahontas', fecha);
      assert.equal(new_film.to_string(), 'Pocahontas - 1995/6/23');
    });
  });
});

//  Supertest tests
//  GET method
describe('GET method tests', () => {
  //  GET example film
  it('Retrieving a film', (done) => {
    supertest(app)
      .get('/pelicula')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  //  GET film by title
  it('Retrieving a film by given title', (done) => {
    supertest(app)
      .get('/pelicula/deadpool')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  //  GET film error
  it('Retrieving not existing film', (done) => {
    supertest(app)
      .get('/pelicula/estonoexiste')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  //  GET film by date
  it('Retrieving a film by given date', (done) => {
    supertest(app)
      .get('/pelicula/1950/9/11')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  //  GET film with wrong date
  it('Retrieving film with wrong', (done) => {
    supertest(app)
      .get('/pelicula/19950/9/11')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

//  PUT method
describe('PUT method tests', () => {
  it('Insertion of a film', (done) => {
    supertest(app)
      .put('/pelicula/Avatar/18/12/2009')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
});

//  DELETE method
describe('DELETE method tests', () => {
  it('Delete a film by title', (done) => {
    supertest(app)
      .delete('/pelicula/deadpool')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
})*/




/*var nueva_pelicula = new Pelicula('El exorcista', '01/09/1973');
assert(nueva_pelicula, 'Nueva pelicula creada');
assert.equal(nueva_pelicula.as_string(), 'El exorcista - 01/09/1973')
console.log('Todos los tests pasados correctamente');*/
