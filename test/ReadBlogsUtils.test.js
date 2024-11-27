const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let baseUrl;
describe('Resource API', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address == '::' ? 'localhost' : address}:${port}`;
    });
    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });
    let count = 0;
    // Test Suite for viewing unfiltered blogs
    describe('GET /view-blogs/default', () => {
        it('should return all blogs', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/default')
                .end((err, res) => {
                    count = res.body.length;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
    // Test Suite for viewing filtered blogs
    describe('GET /view-blogs/filter_date', () => {
        it('should return blogs filtered by the given date', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2024-11-10')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    res.body.forEach(post => {
                        expect(post.date).to.equal('2024-11-10');
                    });
                    done();
                });
        });
        it('should return an error for invalid date format', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2023-0-0')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('Invalid date format');
                    done();
                });
        });
        it('should return an error for a future date', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2025-12-01')
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('Filter date cannot be in the future');
                    done();
                });
        });
        it('should return an error for a date older than 1 year', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2023-11-11')
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('Filter date cannot be more than 1 year ago');
                    done();
                });
        });
        it('should return an empty array if no blogs match the date', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2024-11-11')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.is.empty;
                    done();
                });
        });
    });
    describe('GET /view-blogs/', () => {
        it('should return an error for an empty filter date', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/')
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('Filter date cannot be empty');
                    done();
                });
        });
    });
}); 