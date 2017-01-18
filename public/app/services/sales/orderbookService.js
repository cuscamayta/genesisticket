app.service('OrderbookService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveorderbook = function (orderbook) {
        var defer = $q.defer();
        $http.post('/orderbooks/create', orderbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateorderbook = function (orderbook) {
        var defer = $q.defer();
        $http.post('/orderbooks/update', orderbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getorderbooks = function () {
        var defer = $q.defer();
        $http.get('/orderbooks?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deleteorderbook = function (orderbook) {
        var defer = $q.defer();
        $http.post('/orderbooks/destroy', orderbook).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});