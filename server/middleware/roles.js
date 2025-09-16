module.exports = function permit(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).send("Not authenticated");
    if (allowedRoles.includes("admin") && req.user.isAdmin) return next();
    return res.status(403).send("Forbidden");
  };
};