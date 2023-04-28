import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import { getAllComands, isArrayOfComands } from "./helpers/getAllComands.ts";

dotenv.config();

const token = process.env.TOKEN as string;
const clientId = process.env.CLIENT_ID as string;
const guildId = process.env.GUILD_ID as string;

const allCommands = await getAllComands(true);

const commands: any[] = isArrayOfComands(allCommands) ? allCommands : [];

const rest = new REST().setToken(token);

const registerCommands = async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data} application (/) commands.`);
  } catch (error) {
    console.error("ERROR: ", error);
  }
};

registerCommands();
