var assert = require("assert")

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server');

const api = require('../public/js/api')
describe('Test de test', () => {
    it('should do something', () => {
        chai.request(server).get('/api/todolists').end((err, res) => { // On requète la route GET
            res.should.have.status(200); // On vérifie le statu de la réponse
            res.body.should.be.a('array'); // On vérifie que le résultat est un tableau
            res.body.length.should.be.eql(0); // On vérifie que la longueur du tableau est de 0
            done(); // On dit à mocha que l'on a fini nos assertions
          });
    })
})