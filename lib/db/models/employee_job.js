'use strict';

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('employee_job', {
    EmployeeJobID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'EmployeeID'
      }
    },
    JobID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job',
        key: 'JobID'
      }
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modified_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'employee_job',
    timestamps: false
  });
};