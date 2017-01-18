app.directive('ngfocus', ['$window', "$timeout",
    function ($window, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                $timeout(function () {
                    if (attrs.order) {
                        $(element).focus();
                    }
                }, 300);

                $(element).focus(function () {
                    $(this).addClass("focus");
                });

                $(element).focusout(function () {
                    $(this).removeClass("focus");
                });
            }
        };
    }
]);