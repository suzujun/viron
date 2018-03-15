const Sequelize = require('sequelize');

const TABLE = 'channel_messages';

module.exports = sequelize => {
  const model = sequelize.define(TABLE,
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      channel_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contents: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
      // paranoid: true,
      underscored: true,
      // underscoredAll: true,
      // freezeTableName: false,
      // createdAt: true,
      // updatedAt: true,
      // deletedAt: true,
      charset: 'utf8',
      indexes: [
      ]
    }
  );
  return model;
};
