import { Message, MessageEmbed } from "discord.js";
import settings from "../../settings.config";
import { Command, HeliumClient, UserPermission } from "../../internal";

class DevsCommand extends Command {
    constructor() {
      super({
        name: "devs",
        description: "Shows all devs",
        usage: "[p]devs",
        requiredPermission: UserPermission.USER,
        category: "devs",
      });
    }
  
    exec({ message }: { message: Message }) {
      message.reply('Nothing yet!');
    }
  }

export default {
    name: "Developer Commands",
    description: "Only for developers",
    commands: [DevsCommand],
};