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
async function viewPosts(req, res) {
    try {
        const allResources = await readJSON('utils/posts.json');
        return res.status(201).json(allResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deletePost(req, res) {
    try {
        const id = req.params.id;
        const allResources = await readJSON('utils/posts.json');
        var index = -1;
        for (var i = 0; i < allResources.length; i++) {
            var curcurrResource = allResources[i];
            if (curcurrResource.id == id)
                index = i;
        }
        if (index != -1) {
            allResources.splice(index, 1);
            await fs.writeFile('utils/posts.json', JSON.stringify(allResources), 'utf8');
            return res.status(200).json({ message: 'Resource deleted successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to delete!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    readJSON, writeJSON, viewPosts, deletePost
};