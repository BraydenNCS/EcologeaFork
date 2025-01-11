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
        if(filterDate != "default"){
        if (filterDate == "" || filterDate == undefined) {
            return res.status(500).json({ "message": "Filter date cannot be empty" });
        }
        const current_date = new Date();
        const selected_date = new Date(filterDate);
        const one_year_ago = new Date();
        one_year_ago.setFullYear(current_date.getFullYear() - 1);
        if (selected_date > current_date) {
            return res.status(500).json({ "message": "Filter date cannot be in the future" });
        }else if (selected_date < one_year_ago) {
            return res.status(500).json({ "message": "Filter date cannot be more than 1 year ago" });
        }
        if (isNaN(selected_date.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }
    }
        const filteredPosts = filterDate != "default" ? allPosts.filter(post => post.date === filterDate) : allPosts;

        return res.status(200).json(filteredPosts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    viewBlogs
};
