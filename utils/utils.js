const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

function uploadImage(obj, encodedImage) {
    if (encodedImage === null) return;
    const cover = JSON.parse(encodedImage)
    if (cover!== null && allowedImageTypes.includes(cover.type)) {
        obj.contentImage = new Buffer.from(cover.data, 'base64')
        obj.contentImageType = cover.type
    }
}


module.exports = {
    uploadImage,
    allowedImageTypes
}