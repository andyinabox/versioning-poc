module.exports = function(grunt) {

	grunt.initConfig({
		'imprint-release': {
			options: {
				changelog: true
				, npm: false
				, additionalFiles: ['bower.json']
				, beforeBump: []
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
	grunt.renameTask('release', 'imprint-release');

	grunt.renameTask('release', 'imprint-release');

	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('release-prep', ['checkbranch:master', 'build']);

	// release task aliases
	grunt.registerTask('release', ['release-prep', 'imprint-release']);
	grunt.registerTask('release:patch', ['release-prep', 'imprint-release:patch']);
	grunt.registerTask('release:minor', ['release-prep', 'imprint-release:minor']);
	grunt.registerTask('release:major', ['release-prep', 'imprint-release:major']);
	grunt.registerTask('release:prerelease', ['release-prep', 'imprint-release:prerelease']);

}