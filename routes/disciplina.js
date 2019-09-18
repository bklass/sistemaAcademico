var express         = require('express');
var router          = express.Router();
var mongoDisciplina = require("../models/disciplina");

router.route("/")
    .get(function(req,res){
        var response = {};
        mongoDisciplina.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    }).post(function(req,res){
        var db = new mongoDisciplina();
        var response = {};
        
        db.nome = req.body.nome;
        db.descricao = req.body.descricao;
        db.cargaHoraria = req.body.cargaHoraria;
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
        mongoDisciplina.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    }).put(function(req,res){
        var response = {};
        mongoDisciplina.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.nome !== undefined) {
                    data.nome = req.body.nome;
                }
                if(req.body.descricao !== undefined) {
                    data.descricao = req.body.descricao;
                }
                if(req.body.cargaHoraria !== undefined) {
                    data.cargaHoraria = req.body.cargaHoraria;
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
        mongoDisciplina.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoDisciplina.remove({_id : req.params.id},function(err){
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