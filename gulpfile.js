const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');




// tarefa imagemin
gulp.task('imagemin', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// tarefa images que depende da tarefa imagemin
gulp.task('images', gulp.series('imagemin'));

// tarefa padrão que executa a tarefa images
gulp.task('default', gulp.series('images'));





// Tarefa para compilar o SASS
gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});






// Tarefa para comprimir código JavaScript
gulp.task('uglify', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Tarefa padrão que executa todas as tarefas
gulp.task('default', gulp.parallel('sass', 'imagemin', 'uglify'));

// Tarefa de observação para automatizar as tarefas durante o desenvolvimento
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/images/**/*', gulp.series('imagemin'));
    gulp.watch('src/js/**/*.js', gulp.series('uglify'));
});


exports.images = imagemin;