import AdminUser from "../models/AdminUser";

export const adminProtect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await AdminUser.findById(decoded.userId).select('-password');
            return next();
        } catch (e) {
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    }

});

