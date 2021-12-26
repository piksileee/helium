import { Message, MessageEmbed } from "discord.js";
import { Command, HeliumClient, UserPermission } from "../../internal";

class PingCommand extends Command {
  constructor() {
    super({
      name: "ping",
      description: "Ping? Pong!",
      usage: "[p]ping",
      requiredPermission: UserPermission.USER,
      category: "util",
    });
  }

  exec({ message }: { message: Message }) {
    message.reply(`Pong!`);
  }
}

class PrefixCommand extends Command {
  constructor() {
    super({
      name: "prefix",
      description: "Set the server prefix",
      usage: "[p]prefix h!",
      requiredPermission: UserPermission.ADMIN,
      category: "util",
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
    let guild = await bot.Prisma.guild.update({
      where: {
        id: message.guild?.id,
      },
      data: {
        prefix: args[0],
      },
    });

    message.channel.send(`Set prefix to \`\`${guild.prefix}\`\``);
  }
}

class ExecCommand extends Command {
  constructor() {
    super({
      name: "exec",
      description: "Execute some arbitrairy code on the server",
      usage: "[p]exec console.log('hello')",
      requiredPermission: UserPermission.BOT_OWNER,
      category: "util",
    });
  }
  // This needs to be implemeted by someone else please nightmare nightmare nightmare
  

  // async exec({
  //   message,
  //   bot,
  //   args,
  // }: {
  //   message: Message;
  //   bot: HeliumClient;
  //   args: string[];
  // }) {
  //   message.channel.send(`Not Implemented Yet!`);
  // }
}

export default {
  name: "Utility Commands",
  description: "Some utility commands for utility purposes",
  commands: [PingCommand, PrefixCommand, ExecCommand],
};
