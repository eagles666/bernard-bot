module.exports = (Sequelize, Datatypes) => {
  const Warns = Sequelize.define(
    "warns",
    {
      warn_id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: Datatypes.INTEGER(64),
      },
      modID: {
        type: Datatypes.INTEGER(64),
      },
      msgLink: {
        type: Datatypes.STRING(64),
      },
      reason: {
        type: Datatypes.STRING(256),
        allowNull: false,
      },
      createdAt: {
        type: Datatypes.DATE,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: Datatypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      tableName: "warns",
    }
  );

  return Warns;
};
