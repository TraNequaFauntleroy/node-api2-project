// implement your posts router here
const express = require('express')
const Post = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
    Post.find()
    .then(posts => {
       res.json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The post information could not be retrieve",
            err: err
        })
    })

})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const posts = await Post.findById(id)
        if (!posts) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(posts)
        }

    } catch(err) {
        res.status(500).json({
            message: "The post information could not be retrieve",
            err:err
        })
    }
})

router.post('/', (req, res) => {
    const { title, contents } = req.body
        if (!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            Post.insert({ title, contents })
            .then(({id}) => {
                return Post.findById(id)
            })
            .then(newPost => {
                res.status(201).json(newPost)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                    err: err
                })
            })
        }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findById(req.params.id)
        if (!deletedPost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Post.remove(req.params.id)
            res.json(deletedPost)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post could not be removed',
            err:err
        })
    }

})

router.put('/:id', (req, res) => {

})
router.get('/:id/messages', (req, res) => {

})

module.exports = router
