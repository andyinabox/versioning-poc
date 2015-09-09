module.exports = function(grunt) {

	grunt.initConfig({
		release: {
			options: {
				changelog: true
				, npm: false
				, additionalFiles: ['bower.json']
				, beforeBump: ['checkbranch:master', 'build']
				, afterBump: []
				, beforeRelease: []
				, afterRelease: []
				, updateVars: []
			}
		}
	});


	grunt.loadNpmTasks('grunt-release');


	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);

}