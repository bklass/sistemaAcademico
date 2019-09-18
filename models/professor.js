var mongoose    = require("mongoose");
mongoose.connect('mongodb://localhost:27017/academicoDB');
var mongoSchema = mongoose.Schema;

var professorSchema = {
    "nome": String,
    "disciplina": Array,
    "dataNascimento": Date,
    "email": String
};

module.exports = mongoose.model('professor',professorSchema);