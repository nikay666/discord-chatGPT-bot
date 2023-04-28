import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping ping!'),
  execute:  async (interaction:  Interaction<CacheType>) => {
    if(!interaction.isChatInputCommand()) return;
    interaction.reply('Pong!');
  }
}

export default pingCommand;