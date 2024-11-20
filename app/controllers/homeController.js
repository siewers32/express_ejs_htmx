// Toon loginpagina
exports.zomaarPage = (req, res) => {
    res.render('zomaar', { hello: "blabderdie" });
};

exports.showHomePage = (req,res) => {
    res.render('frontpage')
}