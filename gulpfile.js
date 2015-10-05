var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    react = require('gulp-react'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var onError = function(err) {
    console.log('An error occurred:', err.message);
    this.emit('end');
}

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("assets/jsx/*.jsx", ['react']);
    gulp.watch(["*.html","assets/js/*.jsx"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task("react", function() {
    return gulp.src("assets/jsx/*.jsx")
        .pipe(react())
        .pipe(rename({ extname: ".js" }))
        .pipe(gulp.dest("assets/js"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);