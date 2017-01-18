app.service('TravelService', function ($http, $q) {

    init();

    function init() {
    }

    this.savetravel = function (travel) {
        var defer = $q.defer();
        $http.post('/travels/create', travel).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatetravel = function (travel) {
        var defer = $q.defer();
        $http.post('/travels/update', travel).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.gettravels = function () {
        var defer = $q.defer();
        $http.get('/travels?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletetravel = function (travel) {
        var defer = $q.defer();
        $http.post('/travels/destroy', travel).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});