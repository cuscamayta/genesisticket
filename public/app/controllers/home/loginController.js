app.controller('LoginController', function($scope, LoginService, $localStorage, $location, $rootScope, $timeout) {
    init();
    function init() {
        $scope.user = {};
    }

    $scope.login = function() {
        LoginService.loginUser($scope.user).then(function(responseData) {
            if (responseData.type) {

                $localStorage.currentUser = responseData;
                $rootScope.fullnameuser = $localStorage.currentUser.user.firstname + " " + $localStorage.currentUser.user.lastname;
                $rootScope.roleuser = $localStorage.currentUser.user.Role.title;
                $scope.listoffice = $localStorage.currentUser.offices;

                if ($scope.listoffice.length > 1) {
                    $("#step-2").css("display", "block");
                    $("#step-1").css("display", "none");
                }
                else {
                    $rootScope.currentUser = $localStorage.currentUser;
                    $rootScope.nameoffice = $scope.listoffice.first().Office.title;
                    $rootScope.idoffice = $scope.listoffice.first().idoffice;
                    $localStorage.currentUser.nameOffice = $rootScope.nameoffice;
                    $localStorage.currentUser.idOffice = $rootScope.idoffice;
                    getModulesAndPagesForUser($rootScope.currentUser.permits);
                    $location.path('/home');
                }

            } else {
                $localStorage.currentUser = null;
                $rootScope.currentUser = null;
                toastr.error(responseData.data);
            }
        })
    };

    $scope.validatecontrols = function() {
        return $scope.user == null || $scope.user.username == null || $scope.user.password == null;
    };

    $rootScope.isLoginPage = function() {
        if (!$rootScope.currentUser)
            return { "margin-left": 0 };
    };

    $scope.validateoffice = function() {
        return $scope.selectedoffice == null;
    };

    $scope.getmenu = function() {
        $rootScope.currentUser = $localStorage.currentUser;
        $rootScope.nameoffice = $scope.selectedoffice.Office.title;
        $rootScope.idoffice = $scope.selectedoffice.idoffice;
        $localStorage.currentUser.idOffice = $rootScope.idoffice;
        $localStorage.currentUser.nameOffice = $rootScope.nameoffice;
        getModulesAndPagesForUser($localStorage.currentUser.permits);
        $location.path('/home');
    };    

    $scope.changepass = function() {
        $scope.pass.username = $rootScope.currentUser.user.username;
        LoginService.changepass($scope.pass).then(function(res) {
            if (!res.type) {
                toastr.error(res.data);
            } else {
                $scope.pass = null;
                toastr.success(res.data);
                $location.path('/home');
            }
        });
    };

    $scope.validatecontrolspass = function() {
        return $scope.pass == null || $scope.pass.passcurrent == null || $scope.pass.passnew == null;
    };

    function getModulesAndPagesForUser(permits) {
        $rootScope.listMenuPermit = getModulesAndPages(permits);
        $timeout($enableSideBar, 500);
    }
});