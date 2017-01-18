app.service('PageService', function ($http, $q) {

    init();

    function init() {
    }

    this.savepage = function (page) {
        var defer = $q.defer();
        $http.post('/pages/create', page).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatepage = function (page) {
        var defer = $q.defer();
        $http.post('/pages/update', page).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getpages = function () {
        var defer = $q.defer();
        $http.get('/pages?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletepage = function (page) {
        var defer = $q.defer();
        $http.post('/pages/destroy', page).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});