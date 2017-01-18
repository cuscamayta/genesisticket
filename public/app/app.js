var app = angular.module('genesisApp', ['uitls.paginate', 'ngStorage']);

app.run(function ($localStorage, $rootScope, $location, $timeout) {
    if ($localStorage.currentUser) {
        $rootScope.currentUser = $localStorage.currentUser;
        $rootScope.listMenuPermit = getModulesAndPages($rootScope.currentUser.permits);
        $rootScope.nameoffice = $localStorage.currentUser.nameOffice;
        $rootScope.idoffice = $localStorage.currentUser.idOffice;
        $rootScope.fullnameuser = $localStorage.currentUser.user.firstname + " " + $localStorage.currentUser.user.lastname;
        $rootScope.roleuser = $localStorage.currentUser.user.Role.title;
        $timeout($enableSideBar, 500);
    }
    else
        $location.path('/login');
});

app.config(function ($routeProvider, $httpProvider) {
    debugger;
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'app/partials/home/home.html'
        })
        .when('/setting', {
            controller: 'SettingController',
            templateUrl: 'app/partials/security/setting.html'
        })
        .when('/user', {
            controller: 'UserController',
            templateUrl: 'app/partials/security/user.html'
        })
        .when('/role', {
            controller: 'RoleController',
            templateUrl: 'app/partials/security/role.html'
        })
        .when('/page', {
            controller: 'PageController',
            templateUrl: 'app/partials/security/page.html'
        })
        .when('/module', {
            controller: 'ModuleController',
            templateUrl: 'app/partials/security/module.html'
        })
        .when('/permit', {
            controller: 'PermitController',
            templateUrl: 'app/partials/security/permit.html'
        })
        .when('/useroffice', {
            controller: 'UserofficeController',
            templateUrl: 'app/partials/security/useroffice.html'
        })
        .when('/drivertype', {
            controller: 'DrivertypeController',
            templateUrl: 'app/partials/driver/drivertype.html'
        })
        .when('/driver', {
            controller: 'DriverController',
            templateUrl: 'app/partials/driver/driver.html'
        })
        .when('/bustype', {
            controller: 'BustypeController',
            templateUrl: 'app/partials/bus/bustype.html'
        })
        .when('/bus', {
            controller: 'BusController',
            templateUrl: 'app/partials/bus/bus.html'
        })
        .when('/destination', {
            controller: 'DestinationController',
            templateUrl: 'app/partials/course/destination.html'
        })
        .when('/course', {
            controller: 'CourseController',
            templateUrl: 'app/partials/course/course.html'
        })
        .when('/office', {
            controller: 'OfficeController',
            templateUrl: 'app/partials/course/office.html'
        })
        .when('/orderbook', {
            controller: 'OrderbookController',
            templateUrl: 'app/partials/sales/orderbook.html'
        })
        .when('/invoice', {
            controller: 'InvoiceController',
            templateUrl: 'app/partials/sales/invoice.html'
        })
        .when('/travel', {
            controller: 'TravelController',
            templateUrl: 'app/partials/schedule/travel.html'
        })
        .when('/schedule', {
            controller: 'ScheduleController',
            templateUrl: 'app/partials/schedule/schedule.html'
        })
        .when('/ticket', {
            controller: 'TicketController',
            templateUrl: 'app/partials/sales/ticket.html'
        })
        .when('/invalidate', {
            controller: 'InvalidateController',
            templateUrl: 'app/partials/sales/invalidate.html'
        })
        .when('/manifest', {
            controller: 'ManifestController',
            templateUrl: 'app/partials/manifest/manifest.html'
        })
        .when('/baggage', {
            controller: 'ManifestController',
            templateUrl: 'app/partials/manifest/baggage.html'
        })
        .when('/dailycash', {
            controller: 'DailycashController',
            templateUrl: 'app/partials/report/dailycash.html'
        })
        .when('/dailysale', {
            controller: 'DailysaleController',
            templateUrl: 'app/partials/report/dailysale.html'
        })
        .when('/dailybus', {
            controller: 'DailybusController',
            templateUrl: 'app/partials/report/dailybus.html'
        })
        .when('/voidedinvoice', {
            controller: 'VoidedinvoiceController',
            templateUrl: 'app/partials/report/voidedinvoice.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'app/partials/home/login.html'
        })
        .when('/password', {
            controller: 'LoginController',
            templateUrl: 'app/partials/home/password.html'
        })
        .when('/route/:id', {
            controller: 'HomeController',
            templateUrl: '/routepartial'
        })

        .otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
            'request': function (config) {
                $(".loader").show();
                config.headers = config.headers || {};
                if ($localStorage.currentUser) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.currentUser.user.token;
                }
                return config;
            },
            'response': function (response) {

                $(".loader").hide();
                return response || $q.when(response);

            },
            'responseError': function (response) {
                $(".loader").hide();
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);
});

function getModulesAndPages(permits) {
    if (permits && permits.length > 0) {
        var listpages = permits.select(function (item) {
            item.Page.moduleName = item.Page.Module.title;
            return item.Page;
        });

        var resultPages = listpages.groupBy(function (page) {
            return page.moduleName;
        })
        var listMenuPermit = resultPages.select(function (item) {
            return {
                moduleName: item.key,
                moduleClass: item.first().Module.class,
                pages: item.select(function (page) {
                    return {
                        path: page.path,
                        title: page.title
                    };
                })
            }
        });
        return listMenuPermit;
    } else {
        return listMenuPermit = {};
    }
}