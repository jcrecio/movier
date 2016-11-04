angular.module('movier')
    .directive('movieList', ['MovieService', function(MovieService){

        function getMovies(keyword){
            return keyword 
                ? MovieService.matchMoviesWith(keyword) 
                : MovieService.getAllMovies();
        }

        return {
            restrict: 'E',
            scope: {
                keyword: "="
            },
            templateUrl: 'movie-list.component.html',
            link: function link(scope: any, element, attrs) {
                scope.movies = getMovies(scope.keyword);
            }
        };
    }]);