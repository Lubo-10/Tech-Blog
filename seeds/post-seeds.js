// module
const Post = require('../models/Post');

// variable to hold all the posts
const postData = [
    // expects key value pairs (user_id, title, content)
    {
        // title = the title of the post
        title: 'The tech industry is booming',
        // post_content = the actual content of the post
        post_content: 'did you know that the tech industry is booming? There are more than 1.5 million jobs in the tech industry and the average salary for a tech job is $100,000. This is a great news for the tech industry. I am sure that the tech industry will continue to grow and prosper.',
        //  user_id = the id of the user who created the post
        user_id: 1
    },
    {
        title: 'Github is the best thing since sliced bread',
        post_content: 'Reasons why Github is the best: first of all, it is free. Second, it is open source. Third, it is easy to use. Fourth, it is a great place to learn new things. Fifth, it is a great place to work on projects. With that being said join Github today and get started.',
        user_id: 2
    },
    {
        title: ' 5 tips for a successful tech career',
        post_content: "1. Don't be afraid to ask for help. 2. google is your best friend. 3. Practice coding. 4. Don't copy and paste, but seek to understand the functionality of your code. 5. Never let and error defeat you. Just take a break and you may return with new light.",
        user_id: 3
    }
]

// variable to hold all the comments for each post in the postData array
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;