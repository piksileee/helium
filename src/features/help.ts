import { Message, MessageButton, MessageActionRow, MessageEmbed, Interaction } from "discord.js";
import { client } from "..";
import { Command, HeliumClient, UserPermission } from "../../internal";
import * as logger from "../.././status/logger";
import settings from "../../settings.config";
const wait = require('util').promisify(setTimeout);
client.interaction = {};

class HelpCommand extends Command {
    constructor() {
      super({
        name: "help",
        description: "Help? Help!",
        usage: "[p]help",
        requiredPermission: UserPermission.USER,
        category: "util",
      });
    }
  
    async exec({ message, bot }: { message: Message; bot: HeliumClient }) {;
      let embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are some commands:")
        //.setAuthor(
          //"Helium",
          //"https://cdn.discordapp.com/attachments/892343969479016459/901524819072389190/Cat-banner-2.jpg"
        //)
        .setColor("#FF3232")
        .setFooter('Helium v1.0 | Beta 204.56', bot.user?.displayAvatarURL({ dynamic: true }))
        //.addField("Utility", '\`help\`, \`ping\`, \`prefix\`, \`exec\`')
        .addField("Categories:", '\`utility <4>\`, \`test <1>\`, \`dev <1>\`')

      let utilityembed = new MessageEmbed() // Util Embed
        .setTitle("📕 Utility Commands <4>")
        .addField("Some utility commands for utility purposes", '\`help\`, \`ping\`, \`prefix\`, \`exec\`')
        .setColor("#FF3232")
        .setFooter('Helium v1.0 | Beta 204.56', bot.user?.displayAvatarURL({ dynamic: true }))

      let devembed = new MessageEmbed() // Dev Embed
        .setTitle("📕 Dev Commands <1>")
        .addField("Only for developers", '\`devs\`')
        .setColor("#FF3232")
        .setFooter('Helium v1.0 | Beta 204.56', bot.user?.displayAvatarURL({ dynamic: true }))

      let testembed = new MessageEmbed() // Test Embed
        .setTitle("📕 Test Commands <1>")
        .addField("Only for testing purposes", '\`test\`')
        .setColor("#FF3232")
        .setFooter('Helium v1.0 | Beta 204.56', bot.user?.displayAvatarURL({ dynamic: true }))

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton() // HELP Button
            .setLabel('Help')
            .setStyle('DANGER')
            .setCustomId('help')
            .setDisabled(false),
          
          new MessageButton() // UTILITY Button
            .setLabel('Utility')
            .setStyle('PRIMARY')
            .setCustomId('util')
            .setDisabled(false),

          new MessageButton() // TEST Button
            .setLabel('Test')
            .setStyle('PRIMARY')
            .setCustomId('test')
            .setDisabled(false),

          new MessageButton() // DEV Button
            .setLabel('Developer')
            .setStyle('PRIMARY')
            .setCustomId('dev')
            .setDisabled(false)
        );

        const row2 = new MessageActionRow()
        .addComponents(
          new MessageButton() // LINK Button
            .setLabel('Invite')
            .setStyle('LINK')
            .setURL(`https://discord.com/oauth2/authorize?client_id=${settings.clientid}&scope=bot&permissions=8`)
            .setDisabled(false)
        );

        const MESSAGE = await message.reply({ embeds: [embed], components: [row, row2] })

        const filter = (i: { user: { id: string; }; }) => i.user.id === message.author.id
        //const filter = (i: { customId: string; user: { id: string; }; }) => i.customId === 'util' && i.user.id === message.author.id;
        const collector = MESSAGE.createMessageComponentCollector({ filter, time: 120000 });

        collector.on('collect', async i => {
          if (i.customId === 'help') {
            await i.deferUpdate();
            await wait(800);
            await i.editReply({ embeds: [embed], components: [row, row2] });
          }
          if (i.customId === 'util') {
            await i.deferUpdate();
            await wait(800);
            await i.editReply({ embeds: [utilityembed], components: [row] });
          }
          if (i.customId === 'test') {
            await i.deferUpdate();
            await wait(800);
            await i.editReply({ embeds: [testembed], components: [row] });
          }
          if (i.customId === 'dev') {
            await i.deferUpdate();
            await wait(800);
            await i.editReply({ embeds: [devembed], components: [row] });
          }
        });

      collector.on('end', collected => logger.log(`Collected ${collected.size} item/items`));

      //bot.Commands.forEach((command: Command) => {
        //embed.addField(`\`${command.name}\``, command.description);
      //});
  
      //message.channel.send("We sent you a DM!").then(r => setTimeout(() => {r.delete()}, 5000));
    }
}
export default {
    name: "Utility Commands",
    description: "Some utility commands for utility purposes",
    commands: [HelpCommand],
  };
