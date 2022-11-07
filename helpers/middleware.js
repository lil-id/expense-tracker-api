const prisma = require("../helpers/database");
const jwt = require("jsonwebtoken");

const userSession = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token)
      const decoded = jwt.verify(token, "jwt-secret-code");
      // console.log(decoded)
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (user) {
        // define user value from token in request
        req.user = {
          id: user.id,
          email: user.email,
        };
        next();
      } else {
        res.status(403).send({
          status: false,
          error: "Not Authorize",
        });
      }
    } catch (error) {
      console.log("UserSession middleware helpers error: ", error);
      res.status(403).send({
        status: false,
        error: "Not Authorize",
      });
    }
  }

  if (!token) {
    res.status(401).send({
      status: false,
      error: "Not Authorize, No Token",
    });
  }
};

module.exports = userSession;
