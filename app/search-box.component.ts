angular.module('movier')
    .directive('searchBox', function(){
        return {
            restrict: 'E',
            templateUrl: 'search-box.component.html',
            scope:{
                text: "="
            },
            link: function link(scope: any, element, attrs) {
                
            }
        };
    });