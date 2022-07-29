//  Modules
const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

// create the associations between the tables
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// the purpose of belongsTo is to create a one-to-many relationship
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

Comments.belongsTo(Post, {
    foreignKey: 'post_id'
});

// the purpose of hasMany is to create a many-to-many relationship
User.hasMany(Comments, {
    foreignKey: 'user_id'
});

Post.hasMany(Comments, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comments };