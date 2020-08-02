const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM guilds', (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('idsteam', {
                data: rows
            });
        });
    });
};

module.exports = controller;