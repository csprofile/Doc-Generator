/*Importing resources*/
var express = require('express');
var bodyParser = require('body-parser');
var docGenerator = require('./docGenerator.js');
var formGenerator = require('./formGenerator.js');

/*Express settings*/
var app = express();
app.use(express.static('public'));

/*Body-parser settings*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/api/generate', function(req, res){

    var formData = JSON.parse(req.body.data);

    var genResult = docGenerator.generate(formData);

    if (genResult.success) {
        res.writeHead(200, {
            'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            'Content-disposition': 'attachment;filename=' + formData.template,
            'Content-Length': genResult.buff.length
        });
        res.end(genResult.buff);
    } else {
        res.status(500).send(genResult.message);
    }
});

app.get('/api/getFormFields', function(req, res){
    var documentTemplate = req.query.documentTemplate;
    var fields = formGenerator.getFormFields(documentTemplate);
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(fields));
    
});

app.get('/api/getDocTemplates', function(req, res){
    var templates = formGenerator.getDocumentTemplates();
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(templates));
    
});

/*Start server*/
app.listen(process.env.PORT || 3000, function () {
	var port = process.env.PORT || 3000;
    console.log('Running on http://localhost:'+ port +'!');
});