app.controller('DestinationController', function ($scope, DestinationService) {
    init();
    function init() {
        getdestinations();
        datadestination();
    }

    function datadestination() {
        $scope.editdestination = {
            id: 0,
            state: 1
        };
    };

    function getdestinations() {
        var response = DestinationService.getdestinations();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.destinations = res.data; }
        });
    }

    $scope.savedestination = function () {
        $scope.editdestination;
        if ($scope.editdestination.id == 0) {
            var response = DestinationService.savedestination($scope.editdestination);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getdestinations();
                    datadestination();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = DestinationService.updatedestination($scope.editdestination);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getdestinations();
                    datadestination();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletedestination = function () {
        var response = DestinationService.deletedestination($scope.editdestination);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletedestination").modal("hide");
                datadestination();
                getdestinations();
                toastr.success(res.message);
            }
        })
    };

    $scope.selecteddestination = function (destination, option) {
        $scope.destinationselected = destination;
        $scope.editdestination = angular.copy($scope.destinationselected);
        $scope.editdestination.state = 2;
    };

    $scope.validatecontrols = function () {
        return $scope.editdestination == null || $scope.editdestination.short == null
            || $scope.editdestination.title == null
            || ($scope.editdestination.title != null && $scope.editdestination.title.length < 4)
    };

    $scope.newdestination = function () {
        datadestination();
    };
});