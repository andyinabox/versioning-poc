module.exports = function(grunt) {

	grunt.initConfig({
		release: {
			options: {
				changelog: true
				, npm: false
				, additionalFiles: ['bower.json']
				, beforeBump: ['checkbranch', 'build']
				, afterBump: []
				, beforeRelease: []
				, afterRelease: []
				, updateVars: []
			}
		}
	});


	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-checkbranch');


	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);

}