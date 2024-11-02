const axios = require('axios');
const fs = require('fs');
const path = require('path');
const isUrl = require('is-url');

const isValidUrl = (string) => {
    try {
        return isUrl(string);
    } catch (err) {
        return false;
    }
};

exports.config = {
    name: 'imgur',
    author: 'Jay Mar',
    description: 'Uploads an image to Imgur using a provided image path or URL.',
    category: 'random',
    link: ['/imgur?image=']
};

exports.initialize = async function ({ req, res }) {
    const { image } = req.query;

    if (!image) {
        return res.status(400).json({ error: 'usage: /imgur?image =' });
    }

    const clientId = 'e4f58fc81daec99';
    const url = 'https://api.imgur.com/3/image';

    try {
        let imageData;

        if (isValidUrl(image)) {
            const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });
            imageData = Buffer.from(imageResponse.data).toString('base64');
        } else {
            const fullPath = path.resolve(image);
            imageData = fs.readFileSync(fullPath, { encoding: 'base64' });
        }

        const headers = {
            'Authorization': `Client-ID ${clientId}`,
        };

        const response = await axios.post(
            url,
            { image: imageData },
            { headers }
        );

        if (response.data && response.data.success) {
            res.json({ success: true, link: response.data.data.link });
        } else {
            res.status(500).json({ error: 'Image upload failed', details: response.data });
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({
            error: 'An error occurred',
            details: error.response ? error.response.data : error.message
        });
    }
};
