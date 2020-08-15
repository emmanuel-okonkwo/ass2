// Register the plugin
FilePond.registerPlugin(
    FilePondPluginImagePreview, 
    FilePondPluginFileEncode, 
    FilePondPluginImageCrop, 
    FilePondPluginImageResize,
    FilePondPluginFileValidateSize
);

const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement, {
    allowMultiple: false,
    styleItemPanelAspectRatio: 50 / 100,
    imageResizeTargetWidth: 600,
    imageCropAspectRatio: 1,
    allowFileEncode: true,
    allowImageResize: true,
    allowImageCrop: true,
    allowFileSizeValidation: true,
    maxFileSize: '5MB',
    // imageCropAspectRatio: '1:1'
});