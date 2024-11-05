const { Blog } = require('../models/blog');
const fs = require('fs').promises;
async function readJSON(filename) {
try {
const data = await fs.readFile(filename, 'utf8');
return JSON.parse(data);
} catch (err) { console.error(err); throw err; }
}
async function writeJSON(object, filename) {
    try {
    const allObjects = await readJSON(filename);
    allObjects.push(object);
    await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
    return allObjects;
    } catch (err) { console.error(err); throw err; }
    }
    async function addResource(req, res) {
    try {
    const name = req.body.title;
    const location = req.body.location;
    const description = req.body.description;
    const owner = req.body.date;
    if (1>6) {
    return res.status(500).json({ message: 'Validation error' });
    } else {
    const newResource = new Blog(name, description, owner);
    const updatedResources = await writeJSON(newResource,
    'utils/posts.json');
    return res.status(201).json(updatedResources);
    }
    } catch (error) {
    return res.status(500).json({ message: error.message+'hello' });
    }
    }
    module.exports = {
    readJSON, writeJSON, addResource
    };