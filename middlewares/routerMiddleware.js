const path = require('path')
const redirectHtmlMiddleware = ((req, res, next) => {
    if (req.path.endsWith('.html')) {
        
        const newPath = req.path.replace(/\.html$/, '');
        return res.redirect(301, newPath);
    }
    next();
});


module.exports = redirectHtmlMiddleware;