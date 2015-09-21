'use strict'

module.exports = function(grunt) {

  grunt.registerTask('configure', '', [
    'gitinfo', 
    'updateManifest'
  ]);

  /*
   * updates the manifest of the Web Application in the build folder:
   *  - Replaces the appName in case the parameter name is passed 
   *    (e.g. grunt build --name=niceapplication
   *  - Replaces the developer name with the git user if the name in the 
   *    manifest is gitdeveloper
   *  - Replaces the developer url with the git repo url if the url in the 
   *    manifest is giturl
   *  - Replaces the app version with the git repo branch and hash if the 
   *    version in the manifest is githash
   */
  grunt.registerTask('updateManifest', function() {
    var manifestFile = "build/manifest.webapp";
    var manifest = grunt.file.readJSON(manifestFile); //get file as a string

    var appName = grunt.option('name');
    if (appName != null) {
      manifest.name = appName;
    }
    else {
      appName = manifest.name;
    }
    grunt.config.set("origin", appName);
    manifest.origin = "app://" + appName;

    if (manifest.version == "githash") {
      manifest.version = grunt.config('gitinfo.local.branch.current.name') + " (" +
                         grunt.config('gitinfo.local.branch.current.shortSHA') + ")";
    }

    if (manifest.developer.name == "gitdeveloper") {
      manifest.developer.name = grunt.config('gitinfo.local.branch.current.currentUser');
    }

    if (manifest.developer.url == "giturl") {
      manifest.developer.url = grunt.config('gitinfo.remote.origin.url');
    }

    grunt.file.write(manifestFile, JSON.stringify(manifest, null, 2));
  });
}
