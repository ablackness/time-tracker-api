/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    EmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EmployeeFirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmployeeLastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmployeePosition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmployeeRate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    EmployeeCompanyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'company',
        key: 'CompanyID'
      }
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
    tableName: 'employee',
    timestamps: false
  });
};
