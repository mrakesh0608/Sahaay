import RNFetchBlob from 'rn-fetch-blob';

const { config, fs } = RNFetchBlob;
const PictureDir = fs.dirs.PictureDir;

export function downloadImg(url: string) {

    if (!(url.startsWith('https://') || url.startsWith('http://'))) {
        alert(`The image is already stored locally.\n\nSo, image cannot be downloaded`);
        return;
    }

    const options = {
        fileCache: true,
        addAndroidDownloads: {
            //Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
                PictureDir +
                '/image_' +
                Math.floor(new Date().getTime() + new Date().getSeconds() / 2) + '.' + url.split('.').pop(),
            description: 'Image',
        },
    };
    config(options)
        .fetch('GET', url)
        .then(res => {
            //Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
        }).catch(err => {
            console.log(err);
        })
}