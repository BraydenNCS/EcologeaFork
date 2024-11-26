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
        if (filterDate == "" || filterDate == undefined) {
            res.status(500).json({ "message": "Filter date cannot be empty" });
        }
        const current_date = new Date();
        const selected_date = new Date(filterDate);
        const one_year_ago = new Date();
        one_year_ago.setFullYear(current_date.getFullYear() - 1);
        if (selected_date > current_date) {
            res.status(500).json({ "message": "Filter date cannot be in the future" });
        }else if (selected_date < one_year_ago) {
            res.status(500).json({ "message": "Filter date cannot be more than 1 year ago" });
        }

        const filteredPosts = filterDate != "default" ? allPosts.filter(post => post.date === filterDate) : allPosts;

        res.status(200).json(filteredPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    viewBlogs
};