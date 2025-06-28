
module.exports = (robot) => {
    const onfile = (res, file) => {
        res.send([
            'File received.',
            `name: ${file.name}`,
            `type: ${file.content_type}`,
            `size: ${file.content_size}bytes`,
        ].join('\n'));
    };

    robot.respond('file', (res) => {
        onfile(res, res.json);
    });
};