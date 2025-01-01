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

async function addPost(req, res) {
    try {
        const title = req.body.title;
        const body = req.body.body;
        const date = req.body.date;

        const newBlog = new Blog(title, body, date);
        const updatedBlogs = await writeJSON(newBlog,
            'utils/posts.json');
        return res.status(201).json(updatedBlogs);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
//
module.exports = {
    readJSON, writeJSON, addPost
};