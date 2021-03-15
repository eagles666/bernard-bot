const { MessageEmbed } = require("discord.js");
const { getTimestamp } = require("../../util/functions");

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;
  const warns = await client.Warns.findAll({
    where: { userID: user.id },
  });

  let warnsmsg = "";

  for (let index = 0; index < warns.length; index++) {
    warnsmsg += `${warns[index].dataValues["warn_id"]}) \n raison : ${
      warns[index].dataValues["reason"]
    } \n averti par : <@${
      warns[index].dataValues["modID"]
    }> \n lien message : ${
      warns[index].dataValues["msgLink"]
    } \n date : ${getTimestamp(warns[index].dataValues["createdAt"])}\n`;
  }

  return message.channel.send(
    new MessageEmbed()
      .setThumbnail(user.displayAvatarURL())
      .setAuthor(
        `${user.username} - warns : ${warns.length}`,
        user.displayAvatarURL()
      )
      .setColor("RED")
      .setDescription(warnsmsg)
      .setTimestamp()
      .setFooter(
        `commande faite par ${message.author.username}`,
        message.author.displayAvatarURL()
      )
  );
};

module.exports.help = {
  name: "warns",
  aliases: ["warns", "mywarns"],
  category: "user",
  description: "voir les warns d'un utilisateur",
  cooldown: 1,
  usage: "[@user]",
  isUserAdmin: false,
  adminOnly: false,
  permissions: true,
  args: false,
};
