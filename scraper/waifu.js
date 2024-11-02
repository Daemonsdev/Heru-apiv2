const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'waifu',
    author: 'Jay Mar',
    description: 'Fetches waifu images based on a search query, with an option to send an image.',
    category: 'image',
    link: ['/waifu?search=']
};

exports.initialize = async function ({ req, res }) {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query parameter is required' });
    }

    const url = `https://api.waifu.im/search?q=${encodeURIComponent(searchQuery)}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const imageUrl = data.images?.[0]?.url;  // Assuming the image URL is nested here

        if (!imageUrl) {
            return res.status(404).json({ error: 'No image found for the given search query.' });
        }

        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const imagePath = path.join(cacheDir, `waifu_image_${Date.now()}.png`);
        const imageResponse = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });

        await fs.promises.writeFile(imagePath, imageResponse.data);

        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).json({ error: "Failed to send waifu image" });
            }
        });

        res.on('finish', () => {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });
    } catch (error) {
        console.error('Error fetching waifu data:', error);
        res.status(500).json({ error: 'An error occurred while fetching the data' });
    }
};