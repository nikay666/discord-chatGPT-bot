import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

const helpCommand = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all comands"),
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply("Я пока умею делать только понг бубибубибя");
  },
};

export default helpCommand;
