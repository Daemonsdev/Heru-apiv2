const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'cat-image',
    author: 'Jay Mar',
    description: 'Fetches a random cat image from The Cat API and caches it temporarily.',
    category: 'image',
    link: ['/cat-image']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        const imageUrl = response.data[0]?.url; // Get the image URL from the response

        if (!imageUrl) {
            return res.status(404).json({ error: 'No cat image found.' });
        }

        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const imagePath = path.join(cacheDir, `cat_image_${Date.now()}.png`);
        const imageResponse = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });

        await fs.promises.writeFile(imagePath, imageResponse.data);

        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).json({ error: "Failed to send cat image" });
            }
        });

        res.on('finish', () => {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });
    } catch (error) {
        console.error('Error fetching cat image:', error);
        res.status(500).json({ error: 'Error fetching cat image' });
    }
};