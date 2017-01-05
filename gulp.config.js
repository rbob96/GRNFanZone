

module.exports = function() {
  var config = {
    //All the js files we will have
    sourceJS: [
      './code/**/*.js',
      './*.js'
    ],
    //Less files
    sourceLess: [
      './code/public/**/*.less'
    ],
    //Temp path
    pathTemp: './.tmp/',
    //build path
    pathBuild: './build/'
  };
  return config;
};
