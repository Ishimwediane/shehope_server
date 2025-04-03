export const adminAuth = (req, res, next) => {
    console.log("User from token:", req.user);  // Log the user details from the token
    if (!req.user || !req.user.isAdmin) {
      console.log("Access denied. Admins only.");
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  };