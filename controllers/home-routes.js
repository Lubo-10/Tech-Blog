const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const sequelize = require('../config/connection');


// GET signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });

// GET login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

// GET /api/home - get all posts for logged in user
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        include: [
            {
                model: User,
                attributes: [ 'username' ]
            },
            {
                model: Comments,
                attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: [ 'username' ]
        }
            },
        ]
    })
    .then(dbPostData => {
        //  serialize data for front-end
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn
          });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//  GET single post for logged in user to edit or post new post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [ 'id', 'title', 'post_content', 'created_at' ],
        include: [
            {
                model: User,
                attributes: [ 'username' ]
            },
            {
                model: Comments,
                attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: [ 'username' ]
                }
        }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // serialize data for front-end
        const post = dbPostData.get({ plain: true });
        // pass data to template
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
