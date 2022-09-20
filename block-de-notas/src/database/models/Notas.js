module.exports = (sequelize, dataTypes) => {
    let alias = "Notas";
    let cols = {
      id_nota: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nota: {
        type: dataTypes.STRING(400),
      },
      titulo: {
        type: dataTypes.TEXT,
      },
 
    };
    let config = {
      tableName: "notas",
      timestamps: false,
    };
  
    const Notas = sequelize.define(alias, cols, config);
  
    return Notas;
  };
  