const { MessageEmbed } = require("discord.js");
const { Op } = require("sequelize");

module.exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  if (!user) return message.reply("Il faut mentionner un utilisateur.");

  const warnID = args[1];

  await client.Warns.destroy({
    where: {
      [Op.and]: [{ userID: user.id }, { warn_id: warnID }],
    },
  });

  return message.channel.send(`${user.username} a bien été unwarn`);
};

module.exports.help = {
  name: "unwarn",
  aliases: ["unwarn"],
  category: "moderation",
  description: "retirer un warn d'un utilisateur",
  cooldown: 1,
  usage: "<@user> <warnID>",
  isUserAdmin: false,
  adminOnly: true,
  permissions: true,
  args: true,
};
