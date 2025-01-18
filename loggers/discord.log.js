// package
const { Client, GatewayIntentBits } = require('discord.js');

// env
const { DISCORD_BOT_APPLICATION_TOKEN, DISCORD_SERVER_ID} = process.env;

// service
class DiscordService {

    // cấu hình client
    static intents = [
        GatewayIntentBits.Guilds,               // cấp quyền cho bot
        GatewayIntentBits.DirectMessages,   // cho phép bot nhận và gửi tin nhắn trực tiếp
        GatewayIntentBits.GuildMessages,        // cho phép bot nhận tin nhắn
        GatewayIntentBits.MessageContent        // cho phép bot đọc nội dung tin nhắn
    ];

    // hàm tạo khi tạo khi new một DiscordService
    constructor() {
        this.client =  new Client({ intents: DiscordService.intents });
        this.serverID   = DISCORD_SERVER_ID;    // server discord ID
        
        // lắng nghe sự kiện 'sẵn sàng'
        this.client.on('ready', () => console.log(`Discord: bot ${this.client.user.tag} đã sẵn sàng`));

        // bot ::: đăng nhập vào discord server
        this.client.login(DISCORD_BOT_APPLICATION_TOKEN);
    }

    // format lại nội dung
    sendToFormatCode = async ( data ) => {
        const { 
            code, 
            message = `This's some additional information about the code.`, 
            title   = `Code example` 
        } = data;

        const codeMessage = {
            content: message,
            embeds: [
                {
                    // convert hexadecimal color code to inter
                    color: parseInt('00ff00', 16), 
                    title,
                    description: '```json\n' + JSON.stringify(code, null, 2) + '\n```'
                }
            ]
        }

        // gửi lên discord
        await this.sendToMessage(codeMessage);
    }

    // gửi message lên discord
    sendToMessage = async ( message = 'message') => {
        const channel = this.client.channels.cache.get(DISCORD_SERVER_ID)
        if(!channel){
            console.error(`Không tìm thấy serverID này...`, this.serverID)
            return;
        }

        await channel.send(message).catch(error => console.error(error));
    }
}

module.exports = new DiscordService();

