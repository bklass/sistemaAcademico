var express     = require('express');
var router      = express.Router();
var mongoAluno  = require("../models/aluno");

router.route("/")
    .get(function(req,res){
        var response = {};
        mongoAluno.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    }).post(function(req,res){
        var db = new mongoAluno();
        var response = {};
        
        db.nome = req.body.nome;
        db.curso = req.body.curso;
        db.dataNascimento = new Date(req.body.dataNascimento);
        db.email = req.body.email;
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

router.route("/:id")
    .get(function(req,res){
        var response = {};
        mongoAluno.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    }).put(function(req,res){
        var response = {};
        mongoAluno.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.nome !== undefined) {
                    data.nome = req.body.nome;
                }
                if(req.body.curso !== undefined) {
                    data.curso = req.body.curso;
                }
                if(req.body.dataNascimento !== undefined) {
                    data.dataNascimento = new Date(req.body.dataNascimento);
                }
                if(req.body.email !== undefined) {
                    data.email = req.body.email;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    }).delete(function(req,res){
        var response = {};
        mongoAluno.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoAluno.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });

module.exports = router;