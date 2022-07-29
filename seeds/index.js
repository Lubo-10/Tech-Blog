// modules
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comments-seeds');
const sequelize = require('../config/connection');

// create a variable to hold all the seeds
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');

    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

    console.log('\n----- DATABASE SEEDED -----\n');

    process.exit(0);
};

// run the seedAll function
seedAll();