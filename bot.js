// // Require the necessary discord.js classes
import { Client, Collection, Intents } from 'discord.js';

import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.default.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

// for (const file of eventFiles) {
//   const event = await import(`./events/${file}`);
//   if (event.once) {
//     client.once(event.default.name, (...args) => event.default.execute(...args));
//   } else {
//     client.on(event.default.name, (...args) => event.default.execute(...args));
//   }
// }

client.login(process.env.TOKEN);
