app.controller('UserController', function ($scope, UserService, RoleService) {
    init();
    function init() {
        getroles();
        getusers();
        datauser();
    }

    function datauser() {
        $scope.edituser = {
            id: 0,
            state: 1
        };
        $scope.selectedrole = null;
    };

    function getusers() {
        var response = UserService.getusers();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.users = res.data; }
        });
    }

    function getroles() {
        var response = RoleService.getroles();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listrole = res.data;
            }
        });
    }

    $scope.saveuser = function () {
        $scope.edituser;
        $scope.edituser.idrole = $scope.selectedrole.id;
        if ($scope.edituser.id == 0) {
            var response = UserService.saveuser($scope.edituser);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getusers();
                    datauser();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = UserService.updateuser($scope.edituser);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getusers();
                    datauser();
                    toastr.success(res.message);
                }
            });
        }
        datauser();
    };

    $scope.deleteuser = function () {
        var response = UserService.deleteuser($scope.edituser);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeleteuser").modal("hide");
                datauser();
                getusers();
                toastr.success(res.message);
            }
        });
    };

    $scope.selecteduser = function (user, option) {
        $scope.userselected = user;
        $scope.edituser = angular.copy($scope.userselected);
        $scope.edituser.state = 2;

        if ($scope.listrole) {
            for (var i = 0; i < $scope.listrole.length; i++) {
                if ($scope.listrole[i].id == $scope.edituser.idrole) {
                    $scope.selectedrole = $scope.listrole[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.edituser == null || $scope.edituser.username == null
            || ($scope.edituser.username != null && $scope.edituser.username.length < 4)
            || $scope.edituser.firstname == null || $scope.edituser.lastname == null
            || $scope.edituser.password == null || $scope.selectedrole == null;
    };

    $scope.newuser = function () {
        datauser();
    };
});