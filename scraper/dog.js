const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'dogs',
    author: 'Jay Mar',
    description: 'Fetches a random dog image',
    category: 'random',
    link: ['/dogs']
};

exports.initialize = async function ({ req, res }) {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        const imageUrl = response.data.message;
        
        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const imagePath = path.join(cacheDir, `dog_image_${Date.now()}.png`);
        const imageResponse = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });
        
        await fs.promises.writeFile(imagePath, imageResponse.data);

        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).json({ error: "Failed to send dog image" });
            }
        });

        res.on('finish', () => {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });
        
    } catch (error) {
        console.error("Error fetching dog image:", error);
        res.status(500).json({ message: 'Failed to fetch dog image.' });
    }
};