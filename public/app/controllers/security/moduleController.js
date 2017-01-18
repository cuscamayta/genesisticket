app.controller('ModuleController', function($scope, ModuleService, $filter) {
    init();
    function init() {
        getmodules();
        datamodule();
    }

    function datamodule() {
        $scope.editmodule = {
            id: 0,
            state: 1
        };
    };

    function getmodules() {
        var response = ModuleService.getmodules();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.modules = res.data; }
        });
    }

    $scope.savemodule = function() {
        $scope.editmodule;
        if ($scope.editmodule.id == 0) {
            var response = ModuleService.savemodule($scope.editmodule);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getmodules();
                    datamodule();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = ModuleService.updatemodule($scope.editmodule);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getmodules();
                    datamodule();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletemodule = function() {
        var response = ModuleService.deletemodule($scope.editmodule);
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $("#modaldeletemodule").modal("hide");
                datamodule();
                getmodules();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedmodule = function(module, option) {
        $scope.moduleselected = module;
        $scope.editmodule = angular.copy($scope.moduleselected);
        $scope.editmodule.state = 2;

        if (option == 1) {
            $('#title').val($scope.editmodule.title);
        }
    };

    $scope.validatecontrols = function() {
        return $scope.editmodule == null
            || $scope.editmodule.class == null || $scope.editmodule.title == null
            || ($scope.editmodule.title != null && $scope.editmodule.title.length < 3);
    };

    $scope.newmodule = function() {
        datamodule();
    };
});