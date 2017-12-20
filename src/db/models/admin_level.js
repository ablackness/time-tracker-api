/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_level', {
    admin_level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    admin_level: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'admin_level',
    timestamps: false
  });
};
