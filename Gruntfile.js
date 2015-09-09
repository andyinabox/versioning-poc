module.exports = function(options) {

	grunt.initConfig({
		release: {
			options: {
				changelog: true
				, npm: false
				, beforeBump: ['build']
				, additionalFiles: ['bower.json']
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