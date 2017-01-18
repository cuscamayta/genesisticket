app.controller('SettingController', function ($scope, SettingService, $filter) {
    init();
    function init() {
        getsettings();
        datasetting();
    }

    function datasetting() {
        $scope.editsetting = {
            id: 0,
            state: 1
        };
    };

    function getsettings() {
        var response = SettingService.getsettings();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.settings = res.data; }
        });
    }

    $scope.savesetting = function () {
        $scope.editsetting;
        if ($scope.editsetting.id == 0) {
            var response = SettingService.savesetting($scope.editsetting);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getsettings();
                    datasetting();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = SettingService.updatesetting($scope.editsetting);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getsettings();
                    datasetting();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.selectedsetting = function (setting, option) {
        $scope.settingselected = setting;
        $scope.editsetting = angular.copy($scope.settingselected);
        $scope.editsetting.state = 2;
    };

    $scope.validatecontrols = function () {
        return $scope.editsetting == null || $scope.editsetting.numberid == null
            || $scope.editsetting.note == null || $scope.editsetting.title == null
            || ($scope.editsetting.title != null && $scope.editsetting.title.length < 3);
    };

    $scope.newsetting = function () {
        datasetting();
    };
});