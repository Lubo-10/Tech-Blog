// Modules
const router = require('express').Router()
const { User, Post, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//! CREATE
//  POST create a new user
router.post('/', (req, res) => {
    // access the User model and create a new user
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // send the response
    .then(dbUserData => {
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
       
    // ability to login
    router.post('/login', (req, res) => {
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then(dbUserData => {
          if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
          }
      
          const validPassword = dbUserData.checkPassword(req.body.password);
      
          if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
          }
            // set up session
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

    // ability to logout 
    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });

//! READ
// GET all users
router.get('/', (req, res) => {
    // access the User model and find all users
    User.findAll({
        // exclude the password from the response
        attributes: {  exclude: ['password'] },
        // include the posts from the user
        include: [{
            model: Post,
            attributes: ['title', 'post_content', 'created_at'],
            // include the user from the post
            
        },
        {
            model: Comments,
            attributes: [ 'content', 'created_at' ],
            // include the user from the comment
        }
    ]
    })
    // send the response
    .then(dbUserData => res.json(dbUserData))
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    });
    
    // GET one user
    router.get('/:id', (req, res) => {
        // access the User model and find one user by id
        User.findOne({
            // exclude the password from the response
            attributes: { exclude: ['password'] },
            // find the user by id
            where: {
                id: req.params.id
            },
            // include the posts and comments from the user
            include: [
                {
                    model: Post,
                    attributes: [ 'title', 'post_content', 'created_at'],
                },
                {
                    model: Comments,
                    attributes: [ 'content', 'created_at'],
                }
            ]
        })
        // send the response
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
            })
        // catch any errors
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    });

//! UPDATE
//  PUT update a user
router.put('/:id', (req, res) => {
    // access the User model and update a user
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    // send the response
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! DELETE
// DELETE delete a user by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    // send the response
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;