import { SlashCommandBuilder } from '@discordjs/builders';
import { getPlayer } from '../controllers/players.js';

// Create the slash command.
export default {
  data: new SlashCommandBuilder()
    .setName('pubg')
    .setDescription('Finds a players data')
    .addStringOption((option) => option.setName('input').setDescription('input to echo back').setRequired(true)),
  async execute(interaction) {
    // Wait for the users input and store that in const input
    const input = await interaction.options.get('input');

    // Pass the input to the getPlayer method which is created in the player controller.
    const playerData = await getPlayer(input.value);

    // The discord bot replies with players ID.
    interaction.reply(playerData.data[0].id);
  },
};
