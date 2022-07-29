// Modules
const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// GET /api/dashboard - get all posts for logged in user
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
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
        //  serialize data for front-end
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/dashboard/:id - get one post for logged in user to edit
router.get('/edit/:id', withAuth, (req, res) => {
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
            },
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // serialize data for front-end
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/create/ - create a new post
router.get('/create', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
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
        //  serialize data for front-end
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

