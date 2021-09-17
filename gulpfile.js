var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin');


// сбор css фалов библиотек в один файл 

gulp.task('cssLibsMinic', function() {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.css',
    // 'node_modules/ion-rangeslider/css/ion.rangeSlider.min.css',
    // 'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
    // 'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
    // 'node_modules/rateyo/lib/cjs/rateyo.min.css'
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
  ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
});

// сбор js фалов библиотек в один файл 

gulp.task('jsLibsMinic', function() {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    // 'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js',
    // 'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js',
    // 'node_modules/rateyo/lib/cjs/rateyo.min.js',
    // 'node_modules/mixitup/dist/mixitup.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});



// задача перезгрузки страницы

gulp.task('browsersync', function() {
  browserSync.init({
      server: {
          baseDir: "dist/"
      }
  });
});

// конвертация scss файлов в css с их сжатием в итоговую папку и перезагрузкой страницы

gulp.task('sassConvert', function() {
  return gulp.src('#src/scss/style.scss')
      .pipe(sass( {outputStyle: "compressed"} ))
      .pipe(rename({suffix: ".min"}))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions']
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload( {stream: true} ))
});

// обновление html и передача его в папку итоговую

gulp.task('refreshHtml', function() {
  return gulp.src('dist/*.html')
    .pipe(browserSync.reload( {stream: true} ))
});

// обновление? js файла, его сжатие и передача его в папку проекта 

gulp.task('refreshJs', function() {
  return gulp.src('#src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload( {stream: true} ))
});


gulp.task('imageMin', function() {
  return gulp.src('#src/images/**/*')
      .pipe(imagemin({
        progressive: true,
        interlaced: true,
        optimizationLevel: 2
      }))
      .pipe(gulp.dest('dist/images'))
      .pipe(browserSync.reload( {stream: true} ))
})

// Перенос файлов шрифтов

gulp.task('carryFonts', function() {
  return gulp.src('#src/fonts/*')
      .pipe(gulp.dest('dist/fonts'))
      .pipe(browserSync.reload( {stream: true} ))
})

// эта задача - следит за изменениями в файлах style.scss, .html, .js и одновременно обновляет страницу

gulp.task('watch', function() {
  gulp.watch('#src/scss/*.scss', gulp.parallel('sassConvert'));
  gulp.watch('dist/*.html', gulp.parallel('refreshHtml'));
  gulp.watch('#src/js/*.js', gulp.parallel('refreshJs'));
  gulp.watch('#src/images/**/*', gulp.parallel('imageMin'));
  gulp.watch('#src/fonts/*', gulp.parallel('carryFonts'));
})

gulp.task('minicAllLibs', gulp.parallel('cssLibsMinic', 'jsLibsMinic'))

gulp.task('default', gulp.parallel('sassConvert', 'imageMin', 'carryFonts', 'watch', 'browsersync'));