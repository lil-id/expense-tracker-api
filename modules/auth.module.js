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

    authToken = async (req, res, next) => {
        //https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
        const authHeader = req.headers.authorization;

        try {
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                const decode = jwt.verify(token, process.env.TOKEN_CODE);

                jwt.verify(token, process.env.TOKEN_CODE, (err, user) => {
                    if (err) {
                        return res.sendStatus(403);
                    } else {
                        const user = prisma.user.findUnique({
                            where: {
                                id: decode.id
                            }
                        });
                        if (user) {
                            req.user = {
                                id: user.id,
                                email: user.email,
                            };
                            next();
                        } else {
                            res.sendStatus(403);
                        };
                    };
                });
            } else {
                res.sendStatus(401);
            };
        }
        catch (error) {
            console.error("token user module Errors: ", error);
            res.status(403);
            res.json('invalid token');
        };
    };
}

module.exports = new _auth();
