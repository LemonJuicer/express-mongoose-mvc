// GET home page.

module.exports =
(req, res) =>
{
    req.app.locals.text = req.query.text;
    res.render('query');
};
