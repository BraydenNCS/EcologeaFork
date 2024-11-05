const { Blog } = require('../models/blog');
const fs = require('fs').promises;
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}
async function viewBlogs(req, res) {
    try {
        const allPosts = await readJSON('utils/posts.json');
        console.log(allPosts);
        return res.status(201).json(allPosts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    viewBlogs
};