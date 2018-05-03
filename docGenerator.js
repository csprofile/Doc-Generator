var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');

function generate(rawDocObject){
    
    var docObject = docDataAdapter(rawDocObject);
	//Load the docx file as a binary
	var content = fs.readFileSync(path.resolve(__dirname, 'templates', docObject.template), 'binary');
	var zip = new JSZip(content);
	var ret = {
		success:true,
		message:'',
		buff:null
	}

	var doc = new Docxtemplater();
	doc.loadZip(zip);

	//set the templateVariables
	doc.setData(docObject);

	try {
		// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
		doc.render()
	}
	catch (error) {
		var e = {
			message: error.message,
			name: error.name,
			stack: error.stack,
			properties: error.properties,
		}
		console.log(JSON.stringify({error: e}));
		// The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
		//throw error;
		
		ret.success = false;
		ret.message = error.message;
		return ret;
	}

	ret.buff = doc.getZip().generate({type: 'nodebuffer'});

	// buf is a nodejs buffer
	//fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
	return ret;
}

function docDataAdapter(docObject){
    
    if (docObject.template == 'VSD.docx') {
        var teamMembers = docObject.team_members;
        var teamMembersObjs = new Array();
        
        for (var i = 0; i < teamMembers.length; i++) {
            var memberText = teamMembers[i];
            var left = i % 2 == 0;
            var right = !left;
            
            teamMembersObjs.push({
                text: memberText,
                left: left,
                right: right
            });
        }
        
        docObject.team_members = teamMembersObjs;
    }
    
    return docObject;
}

module.exports = {
	generate:generate
};