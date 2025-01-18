const DiscordService = require('../../loggers/discord.log');

module.exports.pushToLogDiscord = async (req, res, next) => {
    try {
        const host = req.get('host');           // host 
        const originalUrl = req.originalUrl;    // original url

        // discord service to log
        await DiscordService.sendToFormatCode({
            title: `Method: ${req.method}`,
            code: req.method === 'GET' ? req.query: req.body,
            message: `${host}${originalUrl}`
        })

        // next middleware
        return next();
    }
    catch (error) {
        // error
    }
}