/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    CompanyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CompanyAbbreviation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CompanyDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '(user_name())'
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '(getdate())'
    },
    modified_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '(user_name())'
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '(getdate())'
    }
  }, {
    tableName: 'company'
  });
};
