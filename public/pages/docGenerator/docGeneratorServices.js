angular.module('app').factory('docGeneratorServices',['$http','$q', function($http,$q) {


    function getFormItems(documentTemplate){
        var prom = $q.defer();

        $http({
            url: getApiUrl('getFormFields'), 
            method: "GET",
            params: {documentTemplate: documentTemplate}
        }).then(function(response) {
            prom.resolve(response.data);
        });            

        return prom.promise;
    }

    function getDocTemplates(documentTemplate){
        var prom = $q.defer();

        $http({
            url: getApiUrl('getDocTemplates'), 
            method: "GET"
        }).then(function(response) {
            prom.resolve(response.data);
        });            

        return prom.promise;
    }

    function customPostToDownload(formData){
        var url = getApiUrl('generate');
        var tempForm = $('<form></form>').attr('action', url).attr('method', 'post');

        tempForm.append($("<input></input>").attr('type', 'hidden').attr('name', 'data').attr('value', formData));
        tempForm.appendTo('body').submit().remove();
    }

    function getApiUrl(apiMethod){
        var baseApiUrl = '/api/';

        return baseApiUrl + apiMethod
    }

    return {
        getFormItems: getFormItems,
        customPostToDownload: customPostToDownload,
        getDocTemplates: getDocTemplates
    }

}]);