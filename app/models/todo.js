var path = require('path');
var pg = require('pg');
var conString = require(path.join(__dirname, '../', '../', 'config/database'));

exports.getAll = function(req, res) {

    var result = [];

    pg.connect(conString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        var query = client.query('SELECT * FROM items ORDER BY id ASC;');

        query.on('row', function(row) {
            result.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(result);
        });
    });
};

exports.createNew = function(req, res) {

    var result = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    pg.connect(conString, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL query > insert
        client.query('INSERT INTO items(text, complete) VALUES($1, $2)', [data.text, data.complete]);

        var query = client.query('SELECT * FROM items ORDER BY id ASC;');

        query.on('row', function(row) {
            result.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(result);
        });
    });
};

exports.update = function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    pg.connect(conString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

};

exports.delete = function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    pg.connect(conString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

};

