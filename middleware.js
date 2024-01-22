const isAdmin = (req, res, next) => {
    const { userType } = req.body;
        if (userType !== "admin") {
        return res.status(403).send("Not authorized");
    }
    next();
};

export default isAdmin;