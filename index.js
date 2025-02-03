var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const logger = require('./logger');
const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());
const { updatePost } = require('./utils/UpdateBlogsUtils')
app.put('/update-post/:id', updatePost);

const { deletePost,viewPosts } = require('./utils/DeleteBlogsUtils')
app.get('/view-posts', viewPosts);
app.delete('/delete-post/:id', deletePost);

const { viewBlogs } = require('./utils/ReadBlogsUtils')
app.get('/view-blogs/:filter_date?', viewBlogs);

const { addPost } = require('./utils/AddBlogsUtils')
app.post('/add-post', addPost);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})


server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;

    console.log(`Server running at: ${baseUrl}`);
    logger.info(`Server running at: ${baseUrl}!`);
    logger.error(`Example or error log`)
});

module.exports = { app, server }