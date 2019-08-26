/// <binding BeforeBuild='default' />
// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const concat = require('gulp-concat');
var run = require('gulp-run');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Concatenate Vendor CSS
function vendorcss() {
    return gulp
        .src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
            'node_modules/font-awesome-animation/dist/font-awesome-animation.min.css'
        ], { base: 'node_modules/' })
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('wwwroot/vendor'));
}

function vendorjs() {
    return gulp
        .src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js'
        ], { base: 'node_modules/' })
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('wwwroot/vendor'));
}

function builddev() {
    return run('npm run builddev').exec();
}

const build = gulp.parallel(vendorcss, vendorjs, builddev);

exports.default = build;

