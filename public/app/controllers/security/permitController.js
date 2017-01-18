app.controller('PermitController', function($scope, PermitService, RoleService, PageService) {
    init();
    function init() {
        getroles();
        getpages();
        getpermits();
        datapermit();

        $scope.AllSelectedItems = false;
        $scope.NoSelectedItems = false;
    }

    function datapermit() {
        $scope.editpermit = {
            id: 0,
            state: 1
        };
        $scope.selectedpage = null;
    };

    function getpermits() {
        var response = PermitService.getpermits();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.permits = res.data; }
        });
    }

    function getroles() {
        var response = RoleService.getroles();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listrole = res.data;
            }
        });
    }

    function getpages() {
        var response = PageService.getpages();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listpage = res.data;
            }
        });
    }

    $scope.savepermit = function() {

        $scope.newpermits = {};
        $scope.newdetails = [];

        angular.forEach($scope.listpage, function(value) {
            if (value.isSelected) {
                var n = $scope.permits.where(function(item) {
                    return item.idrole == $scope.selectedrole.id && item.idpage == value.id;
                });

                if (n.length == 0) {
                    $scope.valuepermit = {};
                    $scope.valuepermit.idrole = $scope.selectedrole.id;
                    $scope.valuepermit.idpage = value.id;
                    $scope.newdetails.push($scope.valuepermit);
                }
                else {
                    toastr.warning("Página ya fue asignada al rol");
                }
            }
        });

        if ($scope.newdetails.length > 0) {
            $scope.newpermits.details = $scope.newdetails;
            var response = PermitService.savepermit($scope.newpermits);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getpermits();
                    datapermit();
                    getroles();
                    getpages();
                    toastr.success(res.message);
                }
            });
        }

    };

    $scope.deletepermit = function() {
        var response = PermitService.deletepermit($scope.editpermit);
        response.then(function(res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletepermit").modal("hide");
                datapermit();
                getpermits();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedpermit = function(permit, option) {
        $scope.permitselected = permit;
        $scope.editpermit = angular.copy($scope.permitselected);
        $scope.editpermit.state = 2;
    };

    $scope.validatecontrols = function() {
        return $scope.editpermit == null || $scope.selectedrole == null || $scope.NoSelectedItems == true;
    };

    $scope.newpermit = function() {
        getpermits();
        datapermit();
        getroles();
        getpages();
    };

    $scope.clearListPage = function() {
        getpermits();
        datapermit();
        getpages();
    };
});