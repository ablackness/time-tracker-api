/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job', {
    JobID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    JobName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    JobDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    JobDepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'department',
        key: 'DepartmentID'
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
    tableName: 'job',
    timestamps: false
  });
};
