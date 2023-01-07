const path = require('path');
const fs = require('fs');
const resizeImg = require('resize-img');
const directoryPath = path.join(__dirname, 'src/.vuepress/public/images/posts');
var x = 0;
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (!file.includes(','))
            results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk(directoryPath, function (err, results) {
  if (err) throw err;
  results.forEach(function (filePath) {
    let dirname = path.dirname(filePath);
    let filename = path.basename(filePath);
    let ext = path.extname(filePath);
    filename = filename.split('.').slice(0, -1).join('.');
    if (!fs.existsSync(dirname + '/' + filename + ',w_500' + ext)) {
      console.log('Images are generating for ' + filename);
      (async () => {
        [200, 500, 768, 800, 1024, 1366].forEach(async size => {
          const image = await resizeImg(fs.readFileSync(filePath), {
            width: size,
          });
          fs.writeFileSync(dirname + '/' + filename + ',w_' + size + ext, image);
        });
      })().finally(() => console.log('Images are generated for ' + filename));
    }
  });
});
