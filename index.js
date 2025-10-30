import { Client, GatewayIntentBits, Partials } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const CHANNEL_ID = "1433361867773968454"; // Channel where it works
const ROLE_ID = "1433351334978912276"; // Role to ping
const PREFIX = "!help"; // The trigger command

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;

  const content = message.content.trim();
  if (!content.toLowerCase().startsWith(PREFIX)) return;

  // Remove "!help" and keep the rest of the message
  const userMessage = content.slice(PREFIX.length).trim();

  await message.delete().catch(() => {});

  // Format the message the bot will send
  const reply = `<@&${ROLE_ID}> ${userMessage}\n\n*sent by <@${message.author.id}>*`;

  await message.channel.send(reply);
  console.log(`✅ Sent help ping for ${message.author.tag}`);
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
