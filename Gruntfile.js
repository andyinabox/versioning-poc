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


	grunt.renameTask('release', 'imprint-release');

	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('release', ['checkbranch', 'imprint-release']);

}