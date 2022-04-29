import { SlashCommandBuilder } from '@discordjs/builders';
import { getPlayer } from '../controllers/players.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pubg')
    .setDescription('Finds a players data')
    .addStringOption((option) => option.setName('input').setDescription('input to echo back').setRequired(true)),
  async execute(interaction) {
    const input = await interaction.options.get('input');
    interaction.reply(input.value);
    const playerData = await getPlayer(input.value);
    console.log(playerData.data[0].id);
  },
};
