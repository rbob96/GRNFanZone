var gulp = require('gulp');
var args = require('yargs').argv;
var karma = require('karma');
var del = require('del');

var config = require('./gulp.config.js')();

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function (done) {
  log("Vetting code with jshint...");
  return gulp
    .src(config.sourceJS)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('less', ['clean-temp', 'clean-build'], function() {
  log('Compiling less...');
  return gulp
    .src(config.sourceLess)
    .pipe($.less())
    .on('error', errorLogger)
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.pathTemp));
});

gulp.task('less-watcher', function(){
  gulp.watch([config.sourceLess], ['less']);
});

gulp.task('clean-temp', function (done) {
  return clean(config.pathTemp, done);
});

gulp.task('clean-build', function (done){
  return clean(config.pathBuild, done);
});

gulp.task('clean', ['clean-temp', 'clean-build']);

gulp.task('karma', function(done){
  log('Testing with karma server');
  var singlerun = args.once;
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: singlerun
  }, done).start();
});


function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  return del(path);
}

function log(msg) {
  if (typeof(msg) === 'object'){
    for (var item in msg){
      if (msg.hasOwnProperty(item)){
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }

}
