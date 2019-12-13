

const gulp = require("gulp");
const minifyCSS = require("gulp-minify-css");
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const uglify = require("gulp-uglify");//压缩JS文件


gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("Candy/"))
    .pipe(connect.reload())
});

gulp.task("copy-img", function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("Candy/images"))
    .pipe(connect.reload())
})
// js => 导入压缩专区
gulp.task("copy-js-index", function(){
    return gulp.src("js/index.js")
    .pipe(gulp.dest("Candy/js"))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("Candy/js"))
    .pipe(connect.reload())
})




gulp.task("copy-htmls", function(){
    return gulp.src("html/**/*")
    .pipe(gulp.dest("Candy/html"))
    .pipe(connect.reload())
})

//scss => css专区
gulp.task("copy-css", function(){
    return gulp.src("css/reset.css")
    .pipe(gulp.dest("Candy/css"))
    .pipe(minifyCSS())
    .pipe(rename("reset.min.css"))
    .pipe(gulp.dest("Candy/css"))
    .pipe(connect.reload())
})
gulp.task("copy-css-index", function(){
    return gulp.src("css/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("Candy/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("Candy/css"))
    .pipe(connect.reload())
})


gulp.task("copy-json", function(){
    return gulp.src("json/*.json")
    .pipe(gulp.dest("Candy/json"))
    .pipe(connect.reload())
})




gulp.task("copys",["copy-html", "copy-img", "copy-js-index", "copy-htmls", "copy-css","copy-css-index", "copy-json"], function(){
    console.log("项目运行成功");
});




gulp.task("watch", function(){
    gulp.watch("index.html", ["copy-html"]);
    gulp.watch("img/**/*", ["copy-img"]);
    gulp.watch("js/*.js", ["copy-js"]);
    gulp.watch("html/**/*", ["copy-htmls"]);
    gulp.watch("css/index.scss", ["copy-css-index"]);
    gulp.watch("json/*.json", ["copy-json"]);

})



gulp.task("server", function(){
    connect.server({
        root:"Candy",
        port:8888,
        livereload: true
    })
});


gulp.task("default", ["copys","server", "watch"]);










