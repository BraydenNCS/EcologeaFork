var express = require('express');
var bodyParser = require("body-parser");
var client = require('prom-client'); // Import prom-client

var app = express();
const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());

const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
    res.on('finish', () => {
        requestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
    });
    next();
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Route imports
const { updatePost } = require('./utils/UpdateBlogsUtils');
app.put('/update-post/:id', updatePost);

const { deletePost, viewPosts } = require('./utils/DeleteBlogsUtils');
app.get('/view-posts', viewPosts);
app.delete('/delete-post/:id', deletePost);

const { viewBlogs } = require('./utils/ReadBlogsUtils');
app.get('/view-blogs/:filter_date?', viewBlogs);

const { addPost } = require('./utils/AddBlogsUtils');
app.post('/add-post', addPost);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

server = app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { app, server };
