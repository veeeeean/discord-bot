import { Client, GatewayIntentBits, Partials } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

// 👇 replace these two with your actual IDs later
const CHANNEL_ID = "YOUR_CHANNEL_ID";
const ROLE_ID = "YOUR_ROLE_ID";

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;

  if (message.mentions.roles.has(ROLE_ID)) {
    const text = message.content.replace(`<@&${ROLE_ID}>`, "").trim();
    await message.delete().catch(() => {});
    await message.channel.send(`<@&${ROLE_ID}> ${text}`);
  }
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
