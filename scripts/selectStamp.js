
const { Jimp } = require('jimp');

module.exports = (robot) => {
  const onfile = (res, file) => {
    res.download(file, async (path) => {
      let ext = file.name.slice(-4);  // オリジナルの拡張子を取得
      let newFileName = Math.random().toString(32).substring(2) + ext;   // ランダムなファイル名を生成
      try {
        console.log('path: ' + path);
        let image = await Jimp.read(path);
        image.blur(7);
        await image.write(__dirname + '/../images/' + newFileName);
        res.send({
          path: 'images/' + newFileName
        });
      }
      catch (err) {
        res.send('Error: ' + err);
        return;
      }
    });
  }

  robot.respond('file', (res) => {  // ファイルがアップロードされたときの処理
    onfile(res, res.json);
  });
}
