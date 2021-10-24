import { Message, MessageEmbed } from "discord.js";
import { Command, HeliumClient, UserPermission } from "../../internal";

class TestCommand extends Command {
    constructor() {
      super({
        name: "test",
        description: "Test, test, test!",
        usage: "[p]test",
        requiredPermission: UserPermission.USER,
      });
    }
  
    exec({ message }: { message: Message }) {
      message.channel.send(`Test!`);
    }
  }

class TimeCommand extends Command {
    constructor() {
      super({
        name: "time",
        description: "Time? Machine?",
        usage: "[p]time",
        requiredPermission: UserPermission.USER,
      });
    }
  
    async exec({ message }: { message: Message }) {
        const now = new Date();
        await message.reply(`${now.getHours()} : ${now.getMinutes()}`);
    }
  }

export default {
    name: "Test Commands",
    description: "Only for testing purposes",
    commands: [TestCommand, TimeCommand],
};