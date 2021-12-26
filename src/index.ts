import "dotenv/config";
import settings from "../settings.config";
import { Intents, Constants, Message, User } from 'discord.js';
import { HeliumClient } from "../internal";
import { loggerPattern } from "../status/logger";

export let client = new HeliumClient({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  allowedMentions: { parse: ["users", "roles"] },
});

client.loadFeature(require("./features/help"))
client.loadFeature(require("./features/util"));
client.loadFeature(require("./features/devs"));
client.loadFeature(require("./features/test"));

client.login(settings.token);