function isAuthenticated(req, res, next) {
  // Check if the authorization header is present in the request
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check if the authorization header has the correct format
  const authHeaderParts = authHeader.split(" ");
  if (authHeaderParts.length !== 2 || authHeaderParts[0] !== "Bearer") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check if the token is valid
  const token = authHeaderParts[1];
  if (token !== process.env.ACCESS_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // If the token is valid, call the next middleware
  next();
}

module.exports = { isAuthenticated };
