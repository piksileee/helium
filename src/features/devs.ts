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
      });
    }
  
    exec({ message }: { message: Message }) {
      message.reply('Nothing yet!');
      
      
    }
  }

  class EvalCommand extends Command {
    constructor() {
      super({
        name: "eval",
        description: "Evaluates a JS string",
        usage: "[p]eval",
        requiredPermission: UserPermission.USER,
      });
    }
  
    async exec({
      message,
      bot,
      args,
    }: {
      message: Message;
      bot: HeliumClient;
      args: string[];
    }) {
      const devs = settings.devs
      const { member, content } = message
      const contentWithoutPrefix = content.replace(`h!eval`, '')
      if(!contentWithoutPrefix){
        return message.channel.send('nothing to evaluate')
      }

      for (var ids of devs) {
        if (message.author.id == ids) {
          let result = eval(content.replace(`h!eval`, ''))
            const evalMessage = new MessageEmbed()
            .setColor('#FF4C4C')
            .setTitle('Eval Command')
            .addField('Input', '```' + content.replace(`h!`, '') + '```')
            .addField('Output', '```' + result + '```')
            return message.channel.send({ embeds: [evalMessage] })
        }
      }
    }
  }

export default {
    name: "Developer Commands",
    description: "Only for developers",
    commands: [DevsCommand, EvalCommand],
};