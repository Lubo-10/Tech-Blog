// modules 
const router = require('express').Router();
const { User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//! CREATE
// POST a new comment
router.post('/', withAuth, (req, res) => {
    //  access the Comments model and create a new comment
    if (req.session) {
    Comments.create({
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    // send the response
    .then(dbCommentData => res.json(dbCommentData))
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    }
});

//! READ
// GET all user comments
router.get('/', (req, res) => {
    // access the Comments model and find all comments
    Comments.findAll({
        attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at' ],
        order: [['created_at', 'DESC']],
        // include the user of the comment
        include: {
            model: User,
            attributes: ['username']
        }
    })
    // send the response
    .then(dbCommentData => res.json(dbCommentData))
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET one user comment
router.get('/:id', (req, res) => {
    //  access the Comments model and find one comment by id
    Comments.findOne({
        attributes: [ 'id', 'content', 'user_id', 'post_id', 'created_at' ],
        where: {
            id: req.params.id
        },
        // include the user and post from the comment
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    // send the response
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! UPDATE
// PUT update a comment
router.put('/:id', withAuth, (req, res) => {
    // access the Comments model and update a comment by id
    Comments.update({
        content: req.body.content
    }, {
        where: {
            id: req.params.id
        }
    })
    // send the response
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//! DELETE
// DELETE delete a comment by id
router.delete('/:id', withAuth, (req, res) => {
    //  access the Comments model and delete a comment by id
    Comments.destroy({
        where: {
            id: req.params.id
        }
    })
    // send the response
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    // catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;