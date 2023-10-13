const axios = require('axios');
const _ = require('lodash');

const fetchdata = async (req, res, next) => {
    const url = "https://intent-kit-16.hasura.app/api/rest/blogs"
    const admin_secret = "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6"


    try {
        const response = await axios.get(url, {
            headers: {
                'x-hasura-admin-secret': admin_secret,
            },
        })

        const word = "privacy"

        const totalNumberOfBlogs = _.size(response.data.blogs);
        const longestTitle = _.maxBy(response.data.blogs, obj => obj.title.length);
        const wordToFind = _.filter(response.data.blogs, obj => _.includes(obj.title.toLowerCase(), word.toLowerCase()));
        const numberOfBlogs = _.size(wordToFind);
        const uniqueTitle = _.uniqBy(response.data.blogs, 'title');
        const totalBlogsUniqueTitle = uniqueTitle.map(obj=>obj.title);
        const totalNumberOfBlogsTitleUnique = _.size(totalBlogsUniqueTitle);


        req.blogStats = {
            blogs: response.data,
            totalNumberOfBlogs,
            longestTitle,
            numberOfBlogs,
            totalBlogsUniqueTitle,
            totalNumberOfBlogsTitleUnique
        }

        next();
        // res.json(response.data);
    } catch (error) {
        console.error('Error', error.message)
        res.status(500).send("Error fetching data");
    }
}

module.exports = fetchdata;