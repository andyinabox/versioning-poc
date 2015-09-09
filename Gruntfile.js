module.exports = function(grunt) {

	grunt.initConfig({
		release: {
			options: {
				changelog: true
				, npm: false
				, additionalFiles: ['bower.json']
				, beforeBump: ['checkbranch']
				, afterBump: []
				, beforeRelease: []
				, afterRelease: []
				, updateVars: []
			}
		}
	});


	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-checkbranch');

	// renaming so that we can add tasks before
	// grunt.renameTask('release', 'imprint-release');

	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);
	// grunt.registerTask('release-prep', ['checkbranch', 'build']);
	// grunt.registerTask('release', ['release-prep', 'imprint-release']);
	// grunt.registerTask('release:patch', ['release-prep', 'imprint-release']);
	// grunt.registerTask('release', ['release-prep', 'imprint-release']);
	// grunt.registerTask('release', ['release-prep', 'imprint-release']);



}