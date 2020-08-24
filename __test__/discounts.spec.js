const supertest = require('supertest')
const app = require('../server');


const apiPath = process.env.API_PATH

describe("Testing the movies API", () => {
    
  it("tests our testing framework if it works", async () => {
    
    const response = await supertest(app).get('/api/v1/discounts')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe("Success");

    
  });
});

