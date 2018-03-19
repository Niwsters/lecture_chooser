const request = require('supertest');
const sinon = require('sinon');
const assert = require('assert');
const express = require('express');
require('it-each')();

const routes = require('../routes');

const app = express();

const proposal = require('../proposal');
const participant = require('../participant');
const vote = require('../vote');


let calls = [
  {
    method: 'post',
    func: 'create',
    subaddr: ''
  },
  {
    method: 'get',
    func: 'getAll',
    subaddr: ''
  },
  {
    method: 'get',
    func: 'getByID',
    subaddr: '/1'
  },
  {
    method: 'delete',
    func: 'deleteByID',
    subaddr: '/1'
  }
];

let expectRequestCall = function(method, addr, func, next) {
 request(app)
  [method](addr)
  .expect(200)
  .end((err, res) => {
    sinon.assert.called(func);
    next();
  });
};

describe('routes', () => {
  let addr, component;
  beforeEach(() => {
    let components = [proposal, participant, vote];
    for (let i in components) {
      for (let j in components[i]) {
        components[i][j] = sinon.stub().yieldsAsync();
      }
    }

    routes.assignRoutes(app);
  });

  describe('/rest/proposal', () => {
    beforeEach(() => {
      addr = '/rest/proposal';

      component = require('../proposal');
    });

    it.each(calls, '%s should call %s', ['method', 'func'], (element, next) => {
      expectRequestCall(element.method, addr + element.subaddr, component[element.func], next);
    });
  });

  describe('/rest/participant', () => {
    beforeEach(() => {
      addr = '/rest/participant';

      component = require('../participant');
    });

    it.each(calls, '%s should call %s', ['method', 'func'], (element, next) => {
      expectRequestCall(element.method, addr + element.subaddr, component[element.func], next);
    });
  });

  describe('/rest/vote', () => {
    beforeEach(() => {
      addr = '/rest/vote';

      component = require('../vote');
    });

    it.each(calls, '%s should call %s', ['method', 'func'], (element, next) => {
      expectRequestCall(element.method, addr + element.subaddr, component[element.func], next);
    });
  });

});
