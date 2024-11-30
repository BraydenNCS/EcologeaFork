const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let baseUrl;
const assert = require('assert');

describe('Blog API', () => {
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
                    assert.strictEqual(res.status, 200);
                    assert(Array.isArray(res.body), 'Response body is not an array');
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
                    assert.strictEqual(res.status, 200);
                    assert(Array.isArray(res.body), 'Response body is not an array');
                    res.body.forEach(post => {
                        assert.strictEqual(post.date, '2024-11-10');
                    });
                    done();
                });
        });
        //invalid date format
        it('should return an error for invalid date format', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2023-0-0')
                .end((err, res) => {
                    assert.strictEqual(res.status, 400);
                    assert.strictEqual(typeof res.body, 'object');
                    assert.strictEqual(res.body.message, 'Invalid date format');
                    done();
                });
        });
        //dates in the future
        it('should return an error for a future date', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2025-12-01')
                .end((err, res) => {
                    assert.strictEqual(res.status, 500);
                    assert.strictEqual(typeof res.body, 'object');
                    assert.strictEqual(res.body.message, 'Filter date cannot be in the future');
                    done();
                });
        });
        // dates 1 year in the past
        it('should return an error for a date older than 1 year', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2023-11-11')
                .end((err, res) => {
                    assert.strictEqual(res.status, 500);
                    assert.strictEqual(typeof res.body, 'object');
                    assert.strictEqual(res.body.message, 'Filter date cannot be more than 1 year ago');
                    done();
                });
        });
        //no blogs found
        it('should return an empty array if no blogs match the date', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/2024-11-11')
                .end((err, res) => {
                    assert.strictEqual(res.status, 200);
                    assert(Array.isArray(res.body), 'Response body is not an array');
                    assert.strictEqual(res.body.length, 0, 'Response body is not empty');
                    done();
                });
        });
    });

    // Test suite for no filter date provided
    describe('GET /view-blogs/', () => {
        it('should return an error for an empty filter date', (done) => {
            chai.request(baseUrl)
                .get('/view-blogs/')
                .end((err, res) => {
                    assert.strictEqual(res.status, 500);
                    assert.strictEqual(typeof res.body, 'object');
                    assert.strictEqual(res.body.message, 'Filter date cannot be empty');
                    done();
                });
        });
    });
});