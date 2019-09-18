var mongoose    = require("mongoose");
mongoose.connect('mongodb://localhost:27017/academicoDB');
var mongoSchema = mongoose.Schema;

var alunoSchema  = {
    "nome": String,
    "curso": String,
    "dataNascimento": Date,
    "email": String
};

module.exports = mongoose.model('aluno',alunoSchema);