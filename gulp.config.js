

module.exports = function() {
  var config = {
    //All the js files we will have
    sourceJS: [
      './code/**/*.js',
      './*.js'
    ],
    sourceTS: [
      './code/**/*.ts'
    ],
    //Less files
    sourceLess: [
      './code/public/**/*.less'
    ],
    appCode: ["./code/public/**/*.component.ts", "./code/public/**/*.module.ts", "./code/public/**/*.ts"],
    compiledApp: "app.js",
    //Temp path
    pathTemp: './.tmp/',
    //build path
    pathBuild: './build/'
  };
  return config;
};
