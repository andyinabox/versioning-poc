module.exports = function(grunt) {

	grunt.initConfig({
		bump: {
			options: {
				// keep package.json and bower.json in sync
				files: ['package.json', 'bower.json']
				// commit all files
				, commitFiles: ['-a']
				, pushTo: 'origin'
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-checkbranch');

	// renaming so that we can add tasks before
	// setup custom tasks
	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('before-release', ['checkbranch:master', 'build']);
	grunt.registerTask('after-release', []);

	// run before/after tasks and passthrough to bump task
	grunt.registerTask('release', 'Imprint release task', function(sub) {
		var taskName = sub ? 'bump:'+sub : 'bump';
		grunt.task.run(['before-release', taskName, 'after-release']);
	});
};

