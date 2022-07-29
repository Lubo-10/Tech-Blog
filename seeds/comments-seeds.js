const Comments = require('../models/Comments');

// variable to hold all the comments
const commentData = [
    // expects key value pairs (user_id, post_id, content)
    {
        //  user_id = the id of the user who created the comment
        user_id: 1,
        // post_id = the id of the post that the comment is associated with
        post_id: 2,
        // content = the actual comment itself
        content: 'This is awesome! I love it!'
    },
    {
        user_id: 2,
        post_id: 2,
        content: 'Thank you!'
    },
    {
        user_id: 3,
        post_id: 1,
        content: 'I agree!'
    },
    {
        user_id: 1,
        post_id: 1,
        content: 'Do you really like it?'
    },
    {
        user_id: 1,
        post_id: 3,
        content: 'I use these tips a lot.'
    },
    {
        user_id: 2,
        post_id: 3,
        content: 'I have a few tips for a successful tech career too.'
    }
]

// function to seed the comments table with the data in the commentData array
const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;