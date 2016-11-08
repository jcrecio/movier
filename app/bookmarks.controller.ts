angular.module('movier')
    .controller('BookmarksController', function(){
                this.movies = [{ 
                    name:'Braveheart', 
                    synopsis: 'Epic movie about Scotland Independence', 
                    score: 5, 
                    thumbnail: 'Braveheart.png' 
                }];
            });