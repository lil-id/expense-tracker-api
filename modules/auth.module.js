const prisma = require("../helpers/database");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

class _auth {
  login = async (body) => {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      const validation = schema.validate(body);
      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);
        return {
          status: false,
          code: 422,
          error: errorDetails.join(", "),
        };
      }
      //cari user dengan email
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      //kalu user tidak ada
      if (!user) {
        return {
          status: false,
          statusCode: 404,
          error: "User Not Found",
        };
      }
      //kalau user adaa check password
      if (!bcrypt.compareSync(body.password, user.password)) {
        return {
          status: false,
          statusCode: 401,
          error: "Password User Salah",
        };
      }
      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.TOKEN_CODE, { expiresIn: "5h" });
      return {
        status: true,
        data: { token },
      };
    } catch (error) {
      console.error("login auth module erroe", error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _auth();
