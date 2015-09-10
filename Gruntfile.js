module.exports = function(grunt) {

	grunt.initConfig({
		config: {
			pkg: grunt.file.readJSON('package.json')
			, remote: 'origin'
			, stableBranch: 'stable'
		}
		, bump: {
			options: {
				// keep package.json and bower.json in sync
				files: ['package.json', 'bower.json']
				// commit all files
				, commitFiles: ['-a']
				, pushTo: '<%= config.remote %>'
			}
		}
		, gitcheckout: {
			stable: {
				options: {
					branch: '<%= config.stableBranch %>'
					, overwrite: true
				}
			}
			, master: {
				options: {
					branch: 'master'
				}
			}
		}
		, gitpush: {
			stable: {
				options: {
					remote: '<%= config.remote %>'
					, branch: '<%= config.stableBranch %>'
					, force: true
				}
			}
		}
	});


	// load tasks
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-checkbranch');
	grunt.loadNpmTasks('grunt-git');

	// renaming so that we can add tasks before
	// setup custom tasks
	grunt.registerTask('build', []);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('before-release', ['checkbranch:master', 'build']);
	grunt.registerTask('after-release', ['stableBranch']);

	// update the stable branch
	grunt.registerTask('stableBranch', "Update the repository's stable branch from the current master", function() {
		var config = grunt.config.get('config');
		grunt.task.run([
			'checkbranch:master'
			, 'gitcheckout:stable'
			, 'checkbranch:' + config.stableBranch
			, 'gitpush:stable'
			, 'gitcheckout:master'
		]);
	}); 

	// run before/after tasks and passthrough to bump task
	grunt.registerTask('release', 'Imprint release task', function(sub) {
		var taskName = sub ? 'bump:'+sub : 'bump';
		grunt.task.run(['before-release', taskName, 'after-release']);
	});

};

