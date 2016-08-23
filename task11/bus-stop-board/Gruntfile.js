module.exports = function(grunt) {

    grunt.initConfig({
        // less: {
        // 	options: {
        // 		paths: ['app/style']
        // 	},
        // 	files: {
        // 		'app/style/index.css': 'app/style/index.less'
        // 	}
        // },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: {
                    "app/style/index.css": "app/style/index.less"
                }
            },
            // production: {
            //     options: {
            //         modifyVars: {
            //             // imagepath_page: '"/misc/images/"',
            //             // imagepath: '"/misc/images/"'
            //         },
            //         compress: true,
            //         yuicompress: true,
            //         optimization: 2
            //     },
            //     files: {
            //         // "css/pub/APP.common.css": "src/mobile/less/APP.common_grunt.less",
            //         // "css/pub/APP.web.index.css": "src/web/less/APP.web.index.less"
            //         "app/style/index.css": "app/style/index.less"
            //     }
            // }
        },

        watch: {
            files: ['app/style/index.less'],
            tasks: ['less:development']
        },

        connect: {
        	server: {
        		options: {
        			port: 4000,
        			base: 'app',
        			hostname: '*'
        		}
        	},
        	open: {
        		target:  'http://localhost:4000',
        		appName: 'chrome'
        	}
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['less', 'connect', 'watch']);
};
