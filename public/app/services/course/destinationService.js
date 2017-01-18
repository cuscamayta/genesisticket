app.service('DestinationService', function ($http, $q) {

    init();

    function init() {
    }

    this.savedestination = function (destination) {
        var defer = $q.defer();
        $http.post('/destinations/create', destination).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatedestination = function (destination) {
        var defer = $q.defer();
        $http.post('/destinations/update', destination).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getdestinations = function () {
        var defer = $q.defer();
        $http.get('/destinations?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletedestination = function (destination) {
        var defer = $q.defer();
        $http.post('/destinations/destroy', destination).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});