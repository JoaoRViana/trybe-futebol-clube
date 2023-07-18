import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import {login,teams,postMatch, patchMatch} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Login ', async function () {
      // Arrange
      // Act
      const {status,body} = await chai.request(app).post('/login').send(login);
      // Assert
      expect(status).to.be.deep.equal(200);
      expect(body).to.have.key('token');
    });
    it('role', async function () {
      // Arrange
      // Act
      const {body:{token}} = await chai.request(app).post('/login').send(login);
      const {status,body} = await chai.request(app).get('/login/role').set('authorization',`Bearer ${token}`).send();
      // Assert
      expect(status).to.be.deep.equal(200);
      expect(body).to.have.key('role');
    });
    it('teams',async function(){
      const {status, body} = await chai.request(app).get('/teams').send();
      // Assert
      expect(status).to.be.deep.equal(200);
      expect(body).to.be.deep.equal(teams);
    })
    it('home',async function(){
      const {status,body} = await chai.request(app).get('/leaderboard/home').send();
      // Assert
      expect(status).to.be.deep.equal(200);
    })
    it('leaderboard',async function(){
      const {status,body} = await chai.request(app).get('/leaderboard').send();
      // Assert
      expect(status).to.be.deep.equal(200);
    })
    it('get matches', async function () {
      // Arrange
      // Act
      const {body:{token}} = await chai.request(app).post('/login').send(login);
      const {status} = await chai.request(app).get('/matches').set('authorization',`Bearer ${token}`).send();
      // Assert
      expect(status).to.be.deep.equal(200);
    });
    it('post matches', async function () {
      // Arrange
      // Act
      const {body:{token}} = await chai.request(app).post('/login').send(login);
      const {status} = await chai.request(app).post('/matches').set('authorization',`Bearer ${token}`).send(postMatch);
      // Assert
      expect(status).to.be.deep.equal(201);
    });
    it('patch matches', async function () {
      // Arrange
      // Act
      const {body:{token}} = await chai.request(app).post('/login').send(login);
      const {status} = await chai.request(app).patch('/matches/5').set('authorization',`Bearer ${token}`).send(patchMatch);
      // Assert
      expect(status).to.be.deep.equal(200);
    });
});