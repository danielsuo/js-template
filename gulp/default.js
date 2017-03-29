var gulp = require('gulp');
var bulkify = require('bulkify');
var nodemon = require('nodemon');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();

var BROWSER_SYNC_RELOAD_DELAY = 1500;

// Basic usage
gulp.task('browserify', function(done) {
    var stream = gulp.src('src/js/apif.js')
                     .pipe(browserify({
                       insertGlobals : true,
                       transform: [bulkify]
                     }))
                     .pipe(gulp.dest('./build/js'));

    stream.on('end', function() {
      done();
    });
});

gulp.task('build', ['browserify']);

gulp.task('reload', ['build'], function() {
  browserSync.reload();
});

gulp.task('watch', function() {
  var files = ['index.html', 'src/**/*'];
  gulp.watch(files, ['reload']);
});

gulp.task('frontend', ['build', 'watch'], function() {
  browserSync.init({
      server: './'
  });
});

gulp.task('default', ['build', 'watch'], function() {
  nodemon({
    script: './bin/www',
    verbose: 'true',
    ext: 'js html'
  });

  nodemon.on('start', function() {
    console.log('App has started');
  }).on('quit', function() {
    console.log('App has quit');
  }).on('restart', function(files) {
    console.log('App restarted due to: ', files);
    setTimeout(function reload() {
      browserSync.reload({
        stream: false //
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  })
});
