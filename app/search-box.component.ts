angular.module('movier')
    .directive('searchBox', function(){
        return {
            restrict: 'E',
            templateUrl: 'search-box.component.html',
            scope: {
                ngModel: '='
            },
            link: function link(scope: any, element, attrs) {
            }
        };
    });