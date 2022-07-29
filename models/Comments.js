// Modules
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

// The class that grabs the sequelize model methods
class Comments extends Model {}

// the sequelize model method that we are using to create the table for the comments
Comments.init({
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
    // the comment column which is the content of the comment the user will write
    content: {
        // the type of data that we are storing for the content using TEXT and 'tiny' is for a short text sets character limit to 255
        type:  DataTypes.TEXT('tiny'),
        // the content cannot be empty
        allowNull: false,
    },
    // the user_id column
    user_id: {
        // the type of data that we are storing for the user_id
        type: DataTypes.INTEGER,
        // we reference the user_id in the user table for foreign key set up
        references: {
            model: 'User',
            key: 'id'
        }
    },
    // the post_id column
    post_id: {
        // the type of data that we are storing for the post_id
        type: DataTypes.INTEGER,
        // we reference the post_id in the post table for foreign key set up
        references: {
            model: 'Post',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments'
});

module.exports = Comments;