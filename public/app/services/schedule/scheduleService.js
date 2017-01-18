app.service('ScheduleService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveschedule = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/create', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateschedule = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/update', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getschedules = function () {
        var defer = $q.defer();
        $http.get('/schedules?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getschedulesforselect = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/forselect', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };   

    this.getschedulesforhome = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/forhome', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getticketsformanifest = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/formanifest', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteschedule = function (schedule) {
        var defer = $q.defer();
        $http.post('/schedules/destroy', schedule).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});