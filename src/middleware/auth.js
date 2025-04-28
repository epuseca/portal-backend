require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = ["/", "/?populate=listSystem", "/register", "/login", "/account"];
    const dynamicWhiteList = [/^\/v1\/api\/system\/[^\/]/]; // regex cần thêm /v1/api vào
    const originalUrl = req.originalUrl;
    const isStaticWhiteListed = white_lists.find(item => '/v1/api' + item === originalUrl);
    const isDynamicWhiteListed = dynamicWhiteList.some((regex) => regex.test(originalUrl));

    if (isStaticWhiteListed || isDynamicWhiteListed) {
        return next(); 
    } else {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    createBy: "GiaLoc"
                };
                console.log("Check token:", decoded);
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Token bị lỗi/Token hết hạn"
                });
            }
        } else {
            return res.status(401).json({
                message: "Bạn chưa truyền ACCESS TOKEN ở header/Token hết hạn"
            });
        }
    }
};

module.exports = auth;
