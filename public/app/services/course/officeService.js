app.service('OfficeService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveoffice = function (office) {
        var defer = $q.defer();
        $http.post('/offices/create', office).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateoffice = function (office) {
        var defer = $q.defer();
        $http.post('/offices/update', office).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getoffices = function () {
        var defer = $q.defer();
        $http.get('/offices?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getofficesforselect = function () {
        var defer = $q.defer();
        $http.get('/offices/forselect').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteoffice = function (office) {
        var defer = $q.defer();
        $http.post('/offices/destroy', office).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});