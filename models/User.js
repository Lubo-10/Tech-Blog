//  modules that we require
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

//  the class that grabs the sequelize model methods
class User extends Model {
    //  the method that will hash the password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// the sequelize model method that we are using to create the table for the user
User.init({
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
    // the username column
    username: {
        // the type of data that we are storing for the username
        type: DataTypes.STRING,
        // the username cannot be empty
        allowNull: false,
    },
    // the email column
    email: {
        // the type of data that we are storing for the email
        type: DataTypes.STRING,
        // the email cannot be empty
        allowNull: false,
        // the email must be unique meaning it cannot be the same as another email
        unique: true,
        // the email must be a valid email
        validate: {
            // check if the email is valid by using the isEmail function
            isEmail: true
        }
    },
    // the password column
    password: {
        // the type of data that we are storing for the password
        type: DataTypes.STRING,
        // the password cannot be empty
        allowNull: false,
        // we want to validate the password to match our requirements
        validate: {
            len: [8]
        }
    },
}, {
    // the purpose of the hooks is to do something before or after the model method is run
    hooks: {
        // beforeCreate is a hook that runs before the create method is run
       async beforeCreate(newUserData) {
        //    we are hashing the password
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            // using the bcrypt module to hash the password and store it in the password column
            return newUserData;
        },
        // beforeUpdate is a hook that runs before the update method is run
        async beforeUpdate(newUserData) {
            // if the password column is being updated we are hashing the password
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            // using the bcrypt module to hash the password and store it in the password column
            return newUserData;
        }
    },
    // adding our database connection to our model... this is ES6 shorthand for sequelize: sequelize 
    sequelize,
    // the purpose of the freezeTableName is to freeze the table name to the name of the model
    freezeTableName: true,
    // the purpose of the underscored is to make the table name lowercase and use underscores instead of camelCase
    underscored: true,
    // the purpose of the modelName is to change the name of the table to the name of the model
    modelName: 'user'
});

module.exports = User;