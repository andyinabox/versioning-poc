module.exports = function(grunt) {

	grunt.initConfig({
		'imprint-release': {
			options: {
				// keep package.json and bower.json in sync
				, files: ['package.json', 'bower.json']
				// commit all files
				, commitFiles: ['-a']
				, pushTo: 'origin'
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-checkbranch');

	// renaming so that we can add tasks before
	// setup custom tasks
	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('release-prep', ['build']);

	// release task aliases
	grunt.registerTask('release', ['release-prep', 'bump']);
	grunt.registerTask('release:patch', ['release-prep', 'bump:patch']);
	grunt.registerTask('release:minor', ['release-prep', 'bump:minor']);
	grunt.registerTask('release:major', ['release-prep', 'bump:major']);
	grunt.registerTask('release:prerelease', ['release-prep', 'bump:prerelease']);

}