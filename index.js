import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle,ModalBuilder, TextInputBuilder,TextInputStyle } from 'discord.js'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,

    ],
});

client.login(process.env.DISCORD_TOKEN);

const btn = new ButtonBuilder()
        .setCustomId('hiMom')
        .setLabel('Say Hi to my Mom?')
        .setStyle(ButtonStyle.Primary);

client.on('messageCreate', async(message) => {

    console.log(message)

    if (!message?.author.bot) {
        message.author.send({
            content: 'Push my buttons!',
            components: [btn]
        });
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.customId === 'hiMom') {
        await interaction.reply({
            content: 'Mom says hi back!',
            ephemeral: false // if ephemeral is true, only the user who clicks the button sees the message
        });
    }
})