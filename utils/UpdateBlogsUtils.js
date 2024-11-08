const { Blog } = require('../models/blog')
const fs = require('fs').promises;

async function updatePost(req, res) {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const body = req.body.body;
        const date = req.body.date;
        const allPosts = await readJSON('utils/posts.json');
        var modified = false;
        for (var i = 0; i < allResources.length; i++) {
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
    updatePost
    };