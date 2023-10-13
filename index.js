const express = require('express');
const app = express()
const fetchdata = require('./middleware/fetchdata.js')
const port = 3000

app.use('/api/blog-stats', fetchdata);
app.use('/api/blog-search', fetchdata);

app.get('/api/blog-stats', fetchdata, (req, res) => {
    const totalNumberOfBlogs = req.blogStats.totalNumberOfBlogs;
    const blogs = req.blogStats.blogs;
    const longestTitle = req.blogStats.longestTitle;
    const numberOfBlogs = req.blogStats.numberOfBlogs;
    const totalBlogsUniqueTitle = req.blogStats.totalBlogsUniqueTitle;
    const totalNumberOfBlogsTitleUnique = req.blogStats.totalNumberOfBlogsTitleUnique;

    res.json({ totalNumberOfBlogs, longestTitle, numberOfBlogs, totalNumberOfBlogsTitleUnique, totalBlogsUniqueTitle, blogs });
})

app.get('/api/blog-search', (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required for blog search.' });
    }

    // Ensure that req.blogStats.blogs is an array before attempting to filter
    const blogsArray = Array.isArray(req.blogStats.blogs) ? req.blogStats.blogs : [];

    // Filter blogs based on the query string (case-insensitive)
    const filteredBlogs = blogsArray.filter(obj =>
        obj.title.toLowerCase().includes(query.toLowerCase())
    );

    // Send the filtered blogs as JSON in the response
    res.json({ filteredBlogs });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})