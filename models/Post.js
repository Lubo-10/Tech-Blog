// Modules
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

// The class that grabs the sequelize model methods
class Post extends Model {}

// the sequelize model method that we are using to create the table for the post
Post.init({
    // the columns that we are creating
    id: {
        // the type of data that we are storing for the id
        type: DataTypes.INTEGER,
        // the id cannot be empty
        allowNull: false,
        // the id is the primary key
        primaryKey: true,
        // auto increment the id by 1
        autoIncrement: true
    },
    // the title column
    title: {
        // the type of data that we are storing for the title
        type: DataTypes.STRING,
        // the title cannot be empty
        allowNull: false,
    },
    // the body column we called it post_content this is where the user will write their post
    post_content: {
        // the type of data that we are storing for the post_content the TEXT is for long text
        type: DataTypes.TEXT,
        // the post_content cannot be empty
        allowNull: false,
    },
    // the user_id column
    user_id: {
        // the type of data that we are storing for the user_id
        type: DataTypes.INTEGER,
        // we reference the user_id in the user table for foreign key set up
        reference: {
            model: 'User',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
});

module.exports = Post;