import { Message, MessageEmbed } from "discord.js";
import { Command, HeliumClient, UserPermission } from "../../internal";

class PingCommand extends Command {
  constructor() {
    super({
      name: "ping",
      description: "Ping? Pong!",
      usage: "[p]ping",
      requiredPermission: UserPermission.USER,
    });
  }

  exec({ message }: { message: Message }) {
    message.channel.send(`Pong!`);
  }
}

class HelpCommand extends Command {
  constructor() {
    super({
      name: "help",
      description: "Help? Help!",
      usage: "[p]help",
      requiredPermission: UserPermission.USER,
    });
  }

  exec({ message, bot }: { message: Message; bot: HeliumClient }) {
    let embed = new MessageEmbed()
      .setTitle("Command List")
      .setAuthor(
        "Helium",
        "https://cdn.discordapp.com/attachments/892343969479016459/901524819072389190/Cat-banner-2.jpg"
      )
      .setColor("#FF3232")
      .setFooter("Helium v1.0 | Beta 204.56");

    bot.Commands.forEach((command: Command) => {
      embed.addField(command.name, command.description);
    });

    message.author.send({ embeds: [embed] });

    message.channel.send("We sent you a DM!").then(r => setTimeout(() => {r.delete()}, 5000));
  }
}

class PrefixCommand extends Command {
  constructor() {
    super({
      name: "prefix",
      description: "Set the server prefix",
      usage: "[p]prefix h!",
      requiredPermission: UserPermission.ADMIN,
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
  commands: [PingCommand, HelpCommand, PrefixCommand, ExecCommand],
};
