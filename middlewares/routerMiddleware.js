const path = require('path')
const redirectHtmlMiddleware = ((req, res, next) => {
    if (req.path.endsWith('.html')) {
        
        const newPath = req.path.replace(/\.html$/, '');
        return res.redirect(301, newPath);
    }
    next();
});

const isAuthenticated = ((req, res, next) => {
    console.log('test');
    const isLoggedin = req.session.user && req.session.user.isLoggedin || false;
    if (!isLoggedin) {
        return res.redirect('/admin');
    }
    next(); 
})


module.exports = { redirectHtmlMiddleware , isAuthenticated };