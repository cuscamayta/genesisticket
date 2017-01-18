app.controller('PageController', function ($scope, PageService, ModuleService) {
    init();
    function init() {
        getmodules();
        getpages();
        datapage();
    }

    function datapage() {
        $scope.editpage = {
            id: 0,
            state: 1
        };
        $scope.selectedmodule = null;
    };

    function getpages() {
        var response = PageService.getpages();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.pages = res.data; }
        });
    }

    function getmodules() {
        var response = ModuleService.getmodules();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listmodule = res.data;
            }
        });
    }

    $scope.savepage = function () {
        $scope.editpage;
        $scope.editpage.idmodule = $scope.selectedmodule.id;
        if ($scope.editpage.id == 0) {
            var response = PageService.savepage($scope.editpage);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getpages();
                    datapage();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = PageService.updatepage($scope.editpage);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getpages();
                    datapage();
                    toastr.success(res.message);
                }
            });
        }
        datapage();
    };

    $scope.deletepage = function () {
        var response = PageService.deletepage($scope.editpage);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletepage").modal("hide");
                datapage();
                getpages();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedpage = function (page, option) {
        $scope.pageselected = page;
        $scope.editpage = angular.copy($scope.pageselected);
        $scope.editpage.state = 2;

        if ($scope.listmodule) {
            for (var i = 0; i < $scope.listmodule.length; i++) {
                if ($scope.listmodule[i].id == $scope.editpage.idmodule) {
                    $scope.selectedmodule = $scope.listmodule[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editpage == null || $scope.editpage.title == null
            || ($scope.editpage.title != null && $scope.editpage.title.length < 4)
            || $scope.editpage.path == null || $scope.selectedmodule == null;
    };

    $scope.newpage = function () {
        datapage();
    };
});