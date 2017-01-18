app.service('RoleService', function ($http, $q) {

    init();

    function init() {
    }

    this.saverole = function (role) {
        var defer = $q.defer();
        $http.post('/roles/create', role).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updaterole = function (role) {
        var defer = $q.defer();
        $http.post('/roles/update', role).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getroles = function () {
        var defer = $q.defer();
        $http.get('/roles?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleterole = function (role) {
        var defer = $q.defer();
        $http.post('/roles/destroy', role).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});