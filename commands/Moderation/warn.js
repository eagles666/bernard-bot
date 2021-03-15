const { MessageEmbed, DiscordAPIError } = require("discord.js");

const isFirstCharNumeric = (c) => /\d/.test(c);
const isID = (c) => new RegExp("^[0-9]+$").test(c);

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();

  let msgID = null;

  if (isID(args[1])) msgID = args[1];

  let raison = isID(args[1])
    ? args.splice(2, args.length).join(" ")
    : args.splice(1, args.length).join(" ");

  if (!raison) return message.reply("Il faut indiquer une raison!");
  if (!user) return message.reply("Il faut mentionner un utilisateur!");

  const warn = await client.Warns.create({
    userID: user.id,
    modID: message.author.id,
    msgLink: msgID
      ? `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${msgID}`
      : null,
    reason: raison,
  });

  await warn.save();

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Reporté", value: user.username, inline: true },
      {
        name: "Lien du message",
        value: msgID
          ? `[Click Me!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${msgID})`
          : "Aucun lien précisé",
        inline: true,
      },
      {
        name: "Raison",
        value: raison,
      }
    )
    .setTimestamp()
    .setFooter("Cette commande est inutilement difficile!");

  const publicEmbed = new MessageEmbed()
    .setAuthor(`${user.tag} | Warn`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: user.username, inline: true },
      { name: "ID", value: user.id, inline: true },
      {
        name: "Raison",
        value: raison,
      }
    )
    .setTimestamp()
    .setFooter(
      `Averti par ${message.author.username}`,
      message.author.displayAvatarURL()
    );

  //client.channels.cache.get("812654959261777940").send(embed);
  client.channels.cache.get("814196725987803138").send(embed);
  //client.channels.cache.get("819666347617026089").send(publicEmbed);
  client.channels.cache.get("814196725987803138").send(publicEmbed);
  user
    .send(
      `Bonjour, vous avez été warn sur \`${message.guild.name}\` pour la raison suivante: \`${raison}\`.`
    )
    .catch((error) => {
      if (
        error instanceof DiscordAPIError &&
        error.message == "Cannot send messages to this user"
      ) {
        return client.channels.cache
          .get("812654959261777940")
          .send(`Je n'ai pas pu contacter l'utilisateur de son warn`);
      }
      console.log(error);
    });
  message.delete();
};

module.exports.help = {
  name: "warn",
  aliases: ["warn"],
  category: "moderation",
  description: "Avertir un utilisateur et le message",
  cooldown: 1,
  usage: "<@user> [<message_id>] [<raison>]",
  isUserAdmin: true,
  adminOnly: false,
  permissions: true,
  args: true,
};
