module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-responsive-images");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-exec");

	grunt.initConfig({

		uglify: {
		    dist: {
		    	options: {
			      mangle: false
			    },
		      	files: {
		        	"_site/assets/javascripts/app.min.js":
		        		["assets/javascritps/modernizr.custom.js",
			    	  	 "assets/javascripts/jquery.imagesloaded.min.js",
			    	  	 "assets/javascripts/slide-show.js",
			    	  	 "assets/javascripts/application.js"]
		      }
		    }
		},

		cssmin: {
			combine: {
				files: {
					"_site/assets/stylesheets/style.min.css":
						["assets/stylesheets/font-awesome.css",
						 "assets/stylesheets/component.css",
						 "assets/stylesheets/main.css"]
				}
			}
		},

		responsive_images: {
		    dev: {
		    	options: {
		    		rename: false,
		    		sizes: [{
		    			name: "small",
			        	width: 200,
			        	height: 200
		        	}]
		    	},
		    	files: [{
		        	expand: true,
		        	src: ["**.{jpg,gif,png}"],
		        	cwd:  "assets/images",
		        	dest: "assets/images/temp/"
		      }]
		    }
  		},

  		imagemin: {
  		    dynamic: {
  		      files: [{
  		        expand: true,
  		        cwd: "assets/images/",
  		        src: ["**/*.{png,jpg,gif}"],
  		        dest: "assets/images"
  		      }]
  		    }
  		  },


  		copy: {
			main: {
				files: [
					{
						expand: true,
			            src: ["**/*.jpg"],
			            cwd: "assets/images/temp/",
			            dest: ["assets/images/small/"],
			            rename: function(dest, src) {
			              return dest + src.replace("-small", "");
			            }
					},{
						expand: true,
			            src: ["**/*.jpg"],
			            cwd: "assets/images/temp/",
			            dest: ["_site/assets/images/small/"],
			            rename: function(dest, src) {
			              return dest + src.replace("-small", "");
			            }
					}
				]
		    }

		},

		clean: {
			css_js: ["_site/assets/stylesheets/*", "_site/assets/javascripts/*"],
			images: ["assets/images/temp"]
		},

		exec: {
		  build: {
		    cmd: "export JEKYLL_ENV=production jekyll build"
		  },
		  serve: {
		    cmd: "jekyll serve --watch"
		  },
		  deploy: {
		    cmd: "s3_website push"
		  }
		}


	});

	grunt.registerTask("default",["clean:css_js", "cssmin", "uglify", "images", "copy"]);
	grunt.registerTask("images", ["imagemin", "responsive_images", "copy", "clean:images"]);
	grunt.registerTask("deploy", ["default", "exec:deploy"]);

};
