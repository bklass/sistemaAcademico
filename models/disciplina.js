var mongoose    = require("mongoose");
mongoose.connect('mongodb://localhost:27017/academicoDB');
var mongoSchema = mongoose.Schema;

var disciplinaSchema = {
    "nome": String,
    "descricao": String,
    "cargaHoraria": Number    
};

module.exports = mongoose.model('disciplina',disciplinaSchema);