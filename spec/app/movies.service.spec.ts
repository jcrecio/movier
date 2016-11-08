// import IMovie = App.IMovie;

var ALL_MOVIES = [
            { 
                name:'Braveheart', 
                synopsis: 'Epic movie about Scotland Independence', 
                score: 5, 
                thumbnail: 'Braveheart.png' 
            }, 
            { 
                name:'Terminator 2', 
                synopsis: 'A T-800 has been sent from the future about 30 years to kill O\'Connor', 
                score: 4, 
                thumbnail: 'Terminator2.png' 
            }
        ];

describe('MoviesService', function() {
    var service;
    var allMovies;

    beforeEach(angular.mock.module("movier"));

    beforeEach(inject(function(_MovieService_) {
        service = _MovieService_;
        allMovies = service.getAllMovies();
    }));

    it('should retrieve name for movies', function() {
        for(var movie of allMovies){
            expect(movie.name).not.toBeUndefined();
        }
    });

    it('should retrieve synopsis for movies', function() {
        for(var movie of allMovies){
            expect(movie.synopsis).not.toBeUndefined();
        }
    });

    it('should retrieve score for movies', function() {
        for(var movie of allMovies){
            expect(movie.score).not.toBeUndefined();
        }
    });

   it('should retrieve thumbnail for movies', function() {
        for(var movie of allMovies){
            expect(movie.thumbnail).not.toBeUndefined();
        }
    });

    it('should retrieve no result if not maching filter', function() {
        var movies = service.matchMoviesWith('robocop');
        
        expect(movies).toEqual([]);
    });

    it('should retrieve 1 matching result', function() {
        var expectedMovie = ALL_MOVIES[1];
        var movies = service.matchMoviesWith('Terminator');

        expect(movies).toEqual([expectedMovie]);
    });

    it('should retrieve 2 matching result', function() {
        var movies = service.matchMoviesWith('about');

        expect(movies).toEqual(ALL_MOVIES);
    });
});