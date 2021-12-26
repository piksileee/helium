import { Client, ClientEvents, ClientOptions, Message, Presence } from "discord.js";
import settings from "../settings.config";
import { Guild, PrismaClient } from "@prisma/client";
import { ThreadAutoArchiveDuration } from "discord-api-types";
import * as logger from "../status/logger";
import { client } from "../src/index";

enum UserPermission {
  USER,
  ADMIN,
  OWNER,
  BOT_OWNER,
}

type CommandOptions = {
  name: string;
  description: string;
  usage: string;
  requiredPermission: UserPermission;
  category: string;
};

class Command {
  public name: string;
  public description: string;
  public usage: string;
  public requiredPermission: UserPermission;
  public category: string;

  constructor(options: CommandOptions) {
    this.name = options.name;
    this.description = options.description;
    this.usage = options.usage;
    this.requiredPermission = options.requiredPermission;
    this.category = options.category;
  }
  exec({
    message,
    bot,
    args,
    guild,
  }: {
    message: Message;
    bot: HeliumClient;
    args: string[];
    guild: Guild;
  }) {
    message.channel.send("Not Implemented!");
  }
}

class Event {}

class HeliumClient extends Client {
  public Prisma: PrismaClient = new PrismaClient();
  public Commands: Map<string, Command> = new Map();
  interaction: {} | undefined;

  constructor(options: ClientOptions) {
    super(options);

    this.on("ready", this.readyEvent);
    this.on("messageCreate", (msg: Message) => {
      this.handleCommand(msg);
    });
  }

  readyEvent() {
    this.user?.setPresence({ status: "online" }),
    this.user?.setActivity(`h!help`, {type: "LISTENING"}),

    logger.log(this.user?.tag ? `Logged in as ${this.user.tag}` : "Failed to login!");

    logger.log(`Loaded ${this.Commands.size} commands`);

    const Guilds = client.guilds.cache.map(guild => guild.id);
    console.log(Guilds)
  }

  loadFeature(command: any) {
    command.default.commands.forEach((item: any) => {
      let command = new item();
      this.Commands.set(command.name, command);
    });
  }

  async handleCommand(message: Message) {
    if (message.channel.type == "DM") return;
    if (message.author.bot) return;
    let guild = await this.Prisma.guild.findFirst({
      where: {
        id: message.guild?.id,
      },
    });

    if (!guild)
      return this.Prisma.guild.create({
        data: {
          id: message.guild?.id || "",
          logChannel: "",
        },
      });

    if (!message.content.startsWith(guild.prefix)) return;

    const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase();

    let command = this.Commands.get(commandName!);

    if (!command) return;

    switch (command.requiredPermission) {
      case UserPermission.USER:
        command.exec({
          message,
          bot: this,
          args,
          guild,
        });
        break;

      case UserPermission.ADMIN:
        if (message.member?.permissions.has("ADMINISTRATOR")) {
          command.exec({
            message,
            bot: this,
            args,
            guild,
          });
        } else {
          return message.channel.send(
            "You do not have permission to run this command!"
          );
        }
        break;

      case UserPermission.OWNER:
        if (message.author.id == message.guild?.ownerId) {
          command.exec({
            message,
            bot: this,
            args,
            guild,
          });
        } else {
          return message.channel.send(
            "You do not have permission to run this command!"
          );
        }
        break;

      case UserPermission.BOT_OWNER:
        if (message.author.id == `${settings.devs}`) {
          command.exec({
            message,
            bot: this,
            args,
            guild,
          });
        } else {
          return message.channel.send(
            "You do not have permission to run this command!"
          );
        }
        break;

      default:
        break;
    }
  }
}

export { HeliumClient, Command, CommandOptions, UserPermission };
