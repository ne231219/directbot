
module.exports = (robot) => {
  let questionSentId = {};

  robot.respond(/PING$/i, (res) => {
    res.send({
      question: '好きな果物は？',
      options: ['りんご', 'いちご', '梨', 'オレンジ'],
      onsend: (sent) => {
        questionSentId[res.message.rooms[res.message.room].id] = sent.message.id;
      }
    });
  });

  robot.respond('select', (res) => {
    if (res.json.response === null) {
      res.send(`Your question is ${res.json.question}.`);
    } else {
      res.send({
        text: `あなたは ${res.json.options[res.json.response]} が好きなんですね.`,
        onsend: (sent) => {
          res.send({
            close_select: questionSentId[res.message.rooms[res.message.room].id]
          });
        }
      });
    }
  });

};
