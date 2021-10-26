import "dotenv/config";
import settings from "../settings.config";
import { Intents, Constants, Message } from 'discord.js';
import { HeliumClient } from "../internal";

let client = new HeliumClient({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.loadFeature(require("./features/util"));
client.loadFeature(require("./features/test"));

client.login(settings.token);