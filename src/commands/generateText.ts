import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import { getChatGPTResponce } from "../modules/chatGPT/index.ts";

const MAX_COUNT_OF_SYMBOL = 2000;

const generateText = {
  data: new SlashCommandBuilder()
    .setName("generate_text")
    .setDescription("Гененируем ответ от chatGPT(пока нет)")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to generate")
        .setMaxLength(MAX_COUNT_OF_SYMBOL)
    ),

  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    const text = interaction.options.getString("text") ?? "";

    if (!text) {
      interaction.reply(`Ты ничего не ввел(-а) бубибя`);
    } else {
      if (text.length > MAX_COUNT_OF_SYMBOL) {
        const newText = text.slice(0, MAX_COUNT_OF_SYMBOL);

        const { data, status } = await getChatGPTResponce(newText);
      } else {
        const { data, status } = await getChatGPTResponce(text);
        // interaction.reply(`Было введен текст: ${text}`);
        await interaction.deferReply({ ephemeral: true });
        interaction.editReply(`Rresponce: ${data}`);
      }
    }
  },
};

export default generateText;
