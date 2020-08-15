const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const postSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // likes: {
    //     type: Number
    // },
    caption: {
        type: String,
        required: true
    },
    contentImage: {
        type: Buffer,
        required: true
    },
    contentImageType: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true }})

postSchema.virtual('contentImagePath').get(function(){
    if(this.contentImage != null && this.contentImageType != null) {
        return `data:${this.contentImageType};charset=utf-8;base64,${this.contentImage.toString('base64')}`
    }
})

const posts = mongoose.model('posts', postSchema)

module.exports = {
    posts
}