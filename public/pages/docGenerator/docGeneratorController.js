'use strict';
angular.module('app').controller('docGeneratorController', ['$scope', 'docGeneratorServices', function($scope, docGeneratorServices){
    $scope.show = false;
    $scope.showTemplates = false;


    function updateFields(){
        var documentTemplate = $scope.documentSelect;

        $scope.show = false;
        docGeneratorServices
            .getFormItems(documentTemplate)
            .then(function(data){
                $scope.formFields = data;
                $scope.show = true;
            });
    }

    function setDocTemplates(){
        docGeneratorServices
            .getDocTemplates()
            .then(function(data){
                $scope.docTemplates = data;
                $scope.showTemplates = true;
            });
    }

    function generateDoc(){
        var formData = customObjectSerialization($("#js_generateDoc"));
        docGeneratorServices.customPostToDownload(formData);
        console.log(formData);
    }

    function customObjectSerialization(formObject){
        var result = {};

        formObject.find('input, select, textarea').each(function(){

            if ($(this).attr('type') === 'checkbox') {

                if ($(this).prop('checked')) {
                    if ($(this).attr('name') in result === false) {
                        result[$(this).attr('name')] = new Array();
                    }

                    var value = isJsonString($(this).val()) ? JSON.parse($(this).val()) : $(this).val();
                    result[$(this).attr('name')].push(value);
                }

            } else {
                var value = isJsonString($(this).val()) ? JSON.parse($(this).val()) : $(this).val();
                result[$(this).attr('name')] = value;
            }
        });

        return JSON.stringify(result);
    }

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    setDocTemplates();

    $scope.generateDoc = generateDoc;
    $scope.updateFields = updateFields;

}]);