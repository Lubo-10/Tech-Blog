//  Module
const User  = require('../models/User');

// variable to hold all the users
const userData = [
    // expects key value pairs (username, password, email)
    {
        // username = the username of the user they create in the sign up form
        username: 'john_doe',
        // email = the email of the user they create in the sign up form
        email: 'johndoe@tmail.com',
        //  password = the password of the user they create in the sign up form
        password: 'Password1!'
    },
    {
        username: 'sally_smith',
        email: 'sallysmith@tmail.com',
        password: 'Password2@'
    },
    {
        username: 'spongebob',
        email: 'spongebob@tmail.com',
        password: 'Password3#'
    }
]

// function to seed the users table with the data in the userData array
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;