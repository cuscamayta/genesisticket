app.service('CourseService', function ($http, $q) {

    init();

    function init() {
    }

    this.savecourse = function (course) {
        var defer = $q.defer();
        $http.post('/courses/create', course).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatecourse = function (course) {
        var defer = $q.defer();
        $http.post('/courses/update', course).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getcourses = function () {
        var defer = $q.defer();
        $http.get('/courses?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletecourse = function (course) {
        var defer = $q.defer();
        $http.post('/courses/destroy', course).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});