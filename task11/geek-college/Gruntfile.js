module.exports = function(grunt) {

    grunt.initConfig({

        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: {
                    "app/styles/index.css": ["app/styles/index.less", "app/styles/base.less"]
                }
            },

        },

        watch: {
            files: ['app/styles/index.less', 'app/styles/base.less'],
            tasks: ['less:dev']
        },

        connect: {
        	server: {
        		options: {
        			port: 4000,
        			base: ['.'],
        			hostname: '*'
        		}
        	},
        	open: {
        		target:  'http://localhost/app:4000',
        		appName: 'chrome'
        	}
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('test', ['less:dev', 'connect:server', 'watch']);
};
