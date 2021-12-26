import { Message, MessageEmbed } from "discord.js";
import settings from "../../settings.config";
import { Command, HeliumClient, UserPermission } from "../../internal";

class TestCommand extends Command {
    constructor() {
      super({
        name: "test",
        description: "Test, test, test!",
        usage: "[p]test",
        requiredPermission: UserPermission.USER,
        category: "test",
      });
    }
  
    exec({ message }: { message: Message }) {
      message.reply(settings.testmsg);
    }
  }

export default {
    name: "Test Commands",
    description: "Only for testing purposes",
    commands: [TestCommand],
};