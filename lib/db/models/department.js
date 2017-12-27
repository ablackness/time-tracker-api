'use strict';

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('department', {
    DepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DepartmentAbbreviation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DepartmentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DepartmentDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DepartmentCompanyID: {
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
      allowNull: true
    },
    modified_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '(user_name())'
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'department',
    timestamps: false
  });
};