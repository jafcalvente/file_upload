// Definición del modelo File
module.exports = function(sequelize, DataTypes) {

	return sequelize.define('FileTable', {
		name: DataTypes.STRING,
		path: DataTypes.STRING
	});
};
