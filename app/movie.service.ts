angular.module('movier')
    .service('MovieService', function(){
        this.getAllMovies = function(){
            return [
                { 
                    name:'Braveheart', 
                    synopsis: 'Epic movie about Scotland Independence', 
                    score: 5, 
                    thumbnail: 'img1.png' 
                }, 
                { 
                    name:'Terminator 2', 
                    synopsis: 'A T-800 has been sent from the future about 30 years to kill O\'Connor', 
                    score: 4, 
                    thumbnail: 'img2.png' 
                }
            ];
        };

        this.matchMoviesWith = function(keyword){
            const movies = this.getAllMovies();
            return movies.filter(m => matchMovie(m, keyword));
        };
    });

function matchMovie(movie, keyword){
        return movie.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1 
            || movie.synopsis.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
}