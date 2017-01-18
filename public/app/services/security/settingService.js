app.service('SettingService', function ($http, $q) {

    init();

    function init() {
    }

    this.savesetting = function (setting) {
        var defer = $q.defer();
        $http.post('/settings/create', setting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatesetting = function (setting) {
        var defer = $q.defer();
        $http.post('/settings/update', setting).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getsettings = function () {
        var defer = $q.defer();
        $http.get('/settings?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});