

module.exports = function() {
  var config = {
    //All the js files we will have
    sourceJS: [
      './src/**/*.js',
      './*.js'
    ],
    sourceTS: [
      './src/**/*.ts'
    ],
    sourceHTML: [
      './src/**/*.html'
    ],
    //Less files
    sourceLess: [
      './src/**/*.less'
    ],
    sourceCSS: [
      './src/**/*.css'
    ],
    sourceJson: [
      './*.json',
      './src/**/*.json'
    ],
    //Temp path
    pathTemp: './.tmp/',
    //build path
    pathBuild: './dist/',

    htmlhintConfig: {
        "attr-lowercase": false,
        "tagname-lowercase": false
    }

  };
  return config;
};
