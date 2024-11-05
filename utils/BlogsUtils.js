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
        const filterDate = req.params.filter_date;
        const filteredPosts = filterDate ? allPosts.filter(post => post.date === filterDate) : allPosts;

        res.status(200).json(filteredPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    viewBlogs
};