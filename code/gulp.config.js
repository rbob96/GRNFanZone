module.exports = function() {
  var config = {
    //All the js files we will have
    sourceJS: [
      './src/**/*.js',
      './*.js'
    ],
    //Less files
    sourceLess: [
      './src/app/**/*.less'
    ],
    //Temp path
    pathTemp: './.tmp/',
    //build path
    pathBuild: './build/'
  };
  return config;
};
