app.directive('scrollable', ['$window',
    function ($window) {
		return {
			restrict: 'A',

			link: function (scope, element, attrs) {

				var newSize = function () {
					var valor = $('body').height() - (parseInt($(element).offset().top) + $('#footer').height());
					return valor + 15;
				};		

				executeResizeWithTime(200);

				function executeResizeWithTime(time) {
					setTimeout(function () {
						$(element).height(newSize() );
					}, time);
				}

			}
		};
    }
]);


app.directive('editInPlace', function ($timeout) {
	return {
		restrict: 'E',
		scope: {
			value: '=',
			model: '=',
			blurEvent: '&blurEvent'
		},
		template: '<span  data-ng-bind="value" data-ng-click="editInput()" data-ng-show="!editMode"></span><input data-ng-model="value" ng-enter="editMode=false" style="width:60px;height: 20px;" data-ng-show="editMode"></input>',
		link: function ($scope, element, attrs) {
			var input = element.find('input');

			var blurEventHandler = $scope.blurEvent();

			$scope.editInput = function () {
				$scope.modelBeforeEdit = angular.copy($scope.model);
				$scope.editMode = true;
				$timeout(function () {
					$(input).focus().select();
				}, 0, false);
			};

			input.bind('blur', function () {
				$scope.$apply(function () {
					$scope.editMode = false;
					blurEventHandler($scope.value, $scope.model, $scope.modelBeforeEdit);
				});
			});


		}
	};
});