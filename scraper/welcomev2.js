const { WelcomeBuilder } = require('discord-card-canvas');
const fs = require('fs');

// API config details
exports.config = {
    name: 'welcomeV2',
    author: 'Jay Mar',
    description: 'Generate a welcome card with custom text',
    category: 'canvas',
    link: ['/welcomeV2?nickname=Jaymar&secondText=Have a nice day&avatar=https://i.imgur.com/34LyOyS.jpeg']
};

// Initialize API to create welcome image
exports.initialize = async function ({ req, res }) {
    try {
        const { nickname, secondText, avatar } = req.query;

        // Check if the required query parameters are present
        if (!nickname || !secondText || !avatar) {
            return res.status(400).json({ error: "usage: /welcomev2?nickname=your_nickname&secondText=your_second_text&avatar=your_avatar_url" });
        }

        // Create the welcome image with the provided parameters
        const cv = await new WelcomeBuilder({
            fontDefault: 'Inter',
            nicknameText: { color: '#0CA7FF', content: nickname },
            secondText: { color: '#0CA7FF', content: secondText },
            avatarImgURL: avatar
        }).build();

        // Save the welcome image to a buffer
        const buffer = cv.toBuffer();

        // Set appropriate headers and send the image as a response
        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        console.error("Error creating welcome image:", error);
        res.status(500).json({ error: "Failed to create welcome image" });
    }
};