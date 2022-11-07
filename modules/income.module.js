const prisma = require("../helpers/database");
const Joi = require("joi");
const userSession = require('../helpers/middleware')

class _income {
  listIncome = async (id) => {
    try {
      const list = await prisma.pemasukan.findMany({
        where:{
          user_id: id
        },
        include: {
          user: true,
        },
      });
      return {
        status: true,
        statusCode: 201,
        message: "Data Income Berhasil Diambil",
        data: list,
      };
    } catch (error) {
      console.error("listIncome module error : ", error);
      return {
        status: false,
        error,
      };
    }
  };

  addIncome = async (body) => {
    try {
      const schema = Joi.object({
        user_id: Joi.number().required(),
        nama_pemasukan: Joi.string().required(),
        deskripsi: Joi.string().required(),
        harga: Joi.number().required(),
      }).options({
        abortEarly: false,
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
      const newIncome = await prisma.pemasukan.create({
        data: {
          user_id: body.user_id,
          nama_pemasukan: body.nama_pemasukan,
          deskripsi: body.deskripsi,
          harga: body.harga,
        },
      });
      return {
        status: true,
        statusCode: 201,
        message: "Data Income Berhasil Dibuat",
        data: newIncome,
      };
    } catch (error) {
      console.error("addIncome module error : ", error);
      return {
        status: false,
        error,
      };
    }
  };

  updateIncome = async (body, id) => {
    try {
      const schema = Joi.object({
        nama_pemasukan: Joi.string().required(),
        deskripsi: Joi.string().required(),
        harga: Joi.number().required(),
      }).options({
        abortEarly: false,
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
      const updateIncome = await prisma.pemasukan.update({
        where: {
          id: Number(id),
        },
        data: {
          nama_pemasukan: body.nama_pemasukan,
          deskripsi: body.deskripsi,
          harga: body.harga,
        },
      });
      return {
        status: true,
        statusCode: 201,
        message: "Data Income Berhasil Diperbarui",
        data: updateIncome,
      };
    } catch (error) {
      console.error("updateIncome module error : ", error);
      return {
        status: false,
        error,
      };
    }
  };

  deleteIncome = async (id) => {
    try {
      const delIncome = await prisma.pemasukan.delete({
        where: {
          id: id,
        },
      });
      return {
        status: true,
        statusCode: 200,
        message: "Data Income Berhasil delete",
        data: delIncome,
      };
    } catch (error) {
      console.error("delete Income module error : ", error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _income();