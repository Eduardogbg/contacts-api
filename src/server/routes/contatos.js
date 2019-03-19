import express from 'express';
import { mongodbUrl } from '../config.js';
import mongodb from 'mongodb';

const router = express.Router();
const mongoClient = mongodb.MongoClient;

var contatos;
mongoClient.connect(mongodbUrl, { useNewUrlParser: true } , function(err, db) {
  if (err) throw err;
  const database = db.db('contatosdb') 
  contatos = database.collection('contatos');
});

router.get('/', function(req, res, next) {
    contatos.find().toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

router.post('/', function(req, res, next) {
    contatos.save(req.body, function(err, result) {
        if (err) throw err;
        res.json(req.body);
    });
});

router.put('/', function(req, res, next) {
    var _id = new mongodb.ObjectID(req.body._id);
    delete req.body._id
    contatos.updateOne(
        { _id: _id },
        { $set: req.body },
        function(err, result) {
            if (err) throw err;
            res.json(req.body);
        }
    )
});

router.delete('/', function(req, res, next) {
    contatos.deleteOne(
        { _id: new mongodb.ObjectID(req.body._id) },
        function(err, result) {
            if (err) throw err;
            res.json(req.body);
        }
    )
});

export default router;
