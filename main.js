const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");

const Sequelize = require("sequelize");

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const database = new Sequelize({
  dialect: "sqlite",
  storage: "database/database.sqlite",
  logging: false,
});

client.Warns = require("./models/Warns")(database, Sequelize.DataTypes);

database.sync();

client.config = require("./config");
["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);
