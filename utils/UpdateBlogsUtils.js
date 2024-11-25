const { Blog } = require('../models/blog')
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
async function updatePost(req, res) {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const body = req.body.body;
        const date = req.body.date;
        const allPosts = await readJSON('utils/posts.json');
        var modified = false;
        for (var i = 0; i < allPosts.length; i++) {
            var currentPost = allPosts[i];
            if (currentPost.id == id) {
                allPosts[i].title = title;
                allPosts[i].body = body;
                allPosts[i].date = date;
                modified = true;
            }
        }
        if (modified) {
            await fs.writeFile('utils/posts.json', JSON.stringify(allPosts), 'utf8');
            return res.status(201).json({ message: 'Blog has been updated!' });
        } else {
            return res.status(500).json({ message: 'Something went wrong, please retry!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, updatePost
    };