var gulp = require('gulp');
var args = require('yargs').argv;
var karma = require('karma');
var del = require('del');
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");

//Linters:
var csslintConfig = {
  'box-model': false,
  'zero-units': false
}

var config = require('./gulp.config.js')();

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet-js', function (done) {
  log("Vetting code with jshint...");
  gulp.src(config.sourceJS)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose:true}));
});

gulp.task('vet-ts', function (done) {
  log("Vetting code with tshint...");
  gulp.src(config.sourceTS)
      .pipe($.tslint({
            formatter: "verbose"
          }))
      .pipe($.tslint.report({
        emitError: false
      }));
});

gulp.task('vet-html', function (done) {
  log("Vetting code with htmlhint");
  gulp.src(config.sourceHTML)
  .pipe($.htmlhint(config.htmlhintConfig))
  .pipe($.htmlhint.reporter("htmlhint-stylish"))
});

gulp.task('vet-less', function (done) {
    return gulp.src(config.sourceLess)
        .pipe($.lesshint( {} ))
        .pipe($.lesshint.reporter())
});

gulp.task('vet-css', function (done) {
  gulp.src(config.sourceCSS)
      .pipe($.csslint(csslintConfig))
      .pipe($.csslint.formatter(require('csslint-stylish')));
});

gulp.task('vet-json', function (done) {
  gulp.src(config.sourceJson)
      .pipe($.jsonlint())
      .pipe($.jsonlint.reporter());
});


gulp.task('vet-fail', function (done){
  gulp.src(config.sourceJS)
      .pipe($.jshint())
      .pipe($.jshint.reporter('fail'));
  gulp.src(config.sourceTS)
      .pipe($.tslint())
      .pipe($.tslint.report());
  gulp.src(config.sourceHTML)
      .pipe($.htmlhint(config.htmlhintConfig))
      .pipe($.htmlhint.failReporter());
  gulp.src(config.sourceLess)
      .pipe($.lesshint( {} ))
      .pipe($.lesshint.failOnError());
  gulp.src(config.sourceCSS)
      .pipe($.csslint(csslintConfig))
      .pipe($.csslint.formatter('fail'));
  gulp.src(config.sourceJson)
      .pipe($.jsonlint())
      .pipe($.jsonlint.failOnError());
});

gulp.task('compile-less', ['clean-temp', 'clean-build'], function() {
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

gulp.task('compile-app', ['clean-temp', 'clean-build'], function(){
  log('Compiling app js...');
  return gulp.src(config.appJS)
  .pipe(babel())
  .pipe(concat(config.compiledApp))
  .pipe(gulp.dest(config.pathBuild));
});

gulp.task('clean-temp', function (done) {
  return clean(config.pathTemp, done);
});

gulp.task('clean-build', function (done){
  return clean(config.pathBuild, done);
});

gulp.task('clean', ['clean-temp', 'clean-build']);

gulp.task('karma', ['compile-app'], function(done){
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
