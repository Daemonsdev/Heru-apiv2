const knights = require("knights-canvas");
const fs = require('fs');
const path = require('path');

exports.config = {
    name: 'rankv2',
    author: 'Jay Mar',
    description: 'Generate a rank canvas image',
    category: 'canvas',
    link: [
        '/rankv2?avatarUrl=https://i.imgur.com/68NPUFT.jpeg&username=Jay Mar&bg=https://i.ibb.co/4YBNyvP/images-76.jpg&needXp=1000&currXp=100&level=6&rank=https://i.ibb.co/Wn9cvnv/FABLED.png'
    ],
};

exports.initialize = async function ({ req, res }) {
    try {
        const { avatarUrl, username, bg, needXp, currXp, level, rank } = req.query;

        if (!avatarUrl || !username || !bg || !needXp || !currXp || !level || !rank) {
            return res.status(400).json({
                error: "usage: /rankv2?avatarUrl=your_avatar_url&username=your_username&bg=background_url&needXp=required_xp&currXp=current_xp&level=level_number&rank=rank_image_url"
            });
        }

        const image = await new knights.Rank()
            .setAvatar(avatarUrl)
            .setUsername(username)
            .setBg(bg)
            .setNeedxp(needXp)
            .setCurrxp(currXp)
            .setLevel(level)
            .setRank(rank)
            .toAttachment();

        const imageBuffer = image.toBuffer();
        const cacheDir = path.join(__dirname, 'tmp');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        const filePath = path.join(cacheDir, `rank_${Date.now()}.png`);

        await fs.promises.writeFile(filePath, imageBuffer);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).json({ error: "Failed to generate image" });
            }
        });

        res.on('finish', () => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

    } catch (error) {
        console.error("Error generating rank image:", error);
        res.status(500).json({ error: "Failed to generate rank image" });
    }
};