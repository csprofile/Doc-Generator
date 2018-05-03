function getMockedFormFields(documentTemplate){
    var obj = new Array();

    if (documentTemplate == 'sampleDocument.docx') {
        obj = [
            {
                "type":"text",
                "name": "text_1",
                "value": "",
                "description" : "Text example"
            },
            {
                "type":"textarea",
                "name": "text_area_1",
                "value": "",
                "description" : "Text area example"
            },
            {
                "type":"checkbox",
                "name" : "checkbox_1",
                "description" : "Checkbox example",
                "options" : [
                    {
                        "text": "Option 1 Example",
                        "value": "Option 1 Example"
                    },
                    {
                        "text": "Option 2 Example",
                        "value": "Option 2 Example"
                    }
                ]
            },
            {
                "type":"checkbox",
                "name" : "checkbox_2",
                "description" : "Checkbox JSON example",
                "options" : [
                    {
                        "text": "Option 1 Example XYZ",
                        "value": "{\"id\": \"XYZ\", \"text\":\"Text XYZ.\"}"
                    },
                    {
                        "text": "Option 1 Example ABC",
                        "value": "{\"id\": \"ABC\", \"text\":\"Text ABC.\"}"
                    }
                ]
            },
            {
                "type":"select",
                "name" : "select_1",
                "description" : "Select example",
                "options" : [
                    {
                        "text": "Option 1 Example",
                        "value": "Option 1 Example"
                    },
                    {
                        "text": "Option 2 Example",
                        "value": "Option 1 Example"
                    }
                ]
            }
        ]
    } else if (documentTemplate == 'anotherSampleDocument.docx') {
        obj = [
            {
                "type":"text",
                "name": "text_1",
                "value": "",
                "description" : "Text example"
            }
        ]
    }



    obj.push({
        "type":"hidden",
        "name" : "template",
        "value" : documentTemplate,
        "description": ""
    });

    return obj;
}

function getMockedDocumentTemplates(){
    var docs = [
        {
            "template": "sampleDocument.docx",
            "name": "A Sample Document"
        },
        {
            "template": "anotherSampleDocument.docx",
            "name": "Another Sample Document"
        },
    ]

    return docs;
}

module.exports = {
    getFormFields:getMockedFormFields,
    getDocumentTemplates: getMockedDocumentTemplates
};