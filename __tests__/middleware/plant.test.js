'use strict';

process.env.SECRET = "TEST_SECRET";
const bearer = require('../../src/auth/middleware/bearer.js');
const { db, users } = require('../../src/auth/models/index.js');
const jwt = require('jsonwebtoken');

let userInfo = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
  await users.create(userInfo.admin);
});
afterAll(async () => {
  await db.drop();
});

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
    json: jest.fn(() => res),
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return bearer(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });
  });
});

// Fill our database with fake plants
beforeAll(async () => {
  await db.sync();
  await Plant.create(plantInfo.plant);
});

afterAll(async () => {
  await db.drop();
});
// build CRUD tests with Jack herer and Sativa for simplicity
describe('Plant API', () => {

  it('can create a plant (POST /api/plant)', async () => {
    const response = await request(app)
      .post('/api/plant')
      .send({ plantName: 'Jack Herer', plantStrain: 'Sativa' });

    expect(response.status).toBe(201);
    expect(response.body.plantName).toBe('Jack Herer');
  });

  it('can get all plants (GET /api/plant)', async () => {
    const response = await request(app).get('/api/plant');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('can get a plant by id (GET /api/plant/:id)', async () => {
    const plant = await Plant.findOne({ where: { plantName: 'Jack Herer' } });
    const response = await request(app).get(`/api/plant/${plant.id}`);

    expect(response.status).toBe(200);
    expect(response.body.plantName).toBe('Jack Herer');
  });

  it('can update a plant (PUT /api/plant/:id)', async () => {
    const plant = await Plant.findOne({ where: { plantName: 'Jack Herer' } });
    const response = await request(app)
      .put(`/api/plant/${plant.id}`)
      .send({ plantName: 'Jack Herer', plantStrain: 'Sativa' });

    expect(response.status).toBe(200);
    expect(response.body.plantStrain).toBe('Jack Herer');
  });

  it('can delete a plant (DELETE /api/plant/:id)', async () => {
    const plant = await Plant.findOne({ where: { plantName: 'Jack Herer' } });
    const response = await request(app).delete(`/api/plant/${plant.id}`);

    expect(response.status).toBe(204);
  });
});