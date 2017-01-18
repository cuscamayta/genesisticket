app.service('ModuleService', function ($http, $q) {

    init();

    function init() {
    }

    this.savemodule = function (module) {
        var defer = $q.defer();
        $http.post('/modules/create', module).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatemodule = function (module) {
        var defer = $q.defer();
        $http.post('/modules/update', module).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getmodules = function () {
        var defer = $q.defer();
        $http.get('/modules?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletemodule = function (module) {
        var defer = $q.defer();
        $http.post('/modules/destroy', module).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});