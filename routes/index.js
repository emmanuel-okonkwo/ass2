const express = require('express')
const router = express.Router()

const { posts } = require('../models/model')

const { uploadImage } = require('../utils/utils')

router.get('/', async (req, res) => {
    try {
        const GET_POSTS = await posts.find({}).sort('-createdAt')
        return res.render('home', { posts: GET_POSTS})
    } catch (error) {
        res.render('home', { error })
    }
})

router.post('/post', async (req, res) => {
    const { name, caption, cover } = req.body
    try {
        const newPost = new posts({
            name,
            caption
        })
        uploadImage(newPost, cover)
        const done = await newPost.save()
        if (done) return res.redirect('/')
    } catch (error) {
        res.render('home', { posts: new posts, error })
    }
})

router.post('/:postId/comment', async (req, res) => {
    const { message } = req.body
    const { postId } = req.params
    const data = {
        message
    }
    try {
        const getPost = await posts.findById(postId)
        if (!getPost) return;
        const saveComment = await posts.updateOne({ _id: getPost._id }, { "$push": { comments: data } })
        if (!saveComment) return;
        return res.redirect('/')
    } catch (error) {
        res.send(error)
    }
})

module.exports = router