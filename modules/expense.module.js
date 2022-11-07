const prisma = require('../helpers/database')
const validate = require('../helpers/validation')
const Joi = require('joi')

class _expense {
    listExpense = async () => {
        try {
            const getAllExpense = await prisma.pengeluaran.findMany({
                include: {
                    user: true
                }
            })

            return {
                status: true,
                statusCode: 200,
                message: "Data Expense Berhasil Diambil",
                data: getAllExpense
            }

        } catch (error) {
            console.error("listExpense module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    addExpense = async (body) => {
        try {
            const schema = Joi.object({
                user_id: Joi.number().required(),
                nama_pengeluaran: Joi.string().required(),
                deskripsi: Joi.string().required(),
                harga: Joi.number().required()
            })

            const validateResult = validate.validation(schema, body)

            if (!validateResult.status) {
                return validateResult
            }

            const createExpense = await prisma.pengeluaran.create({
                data: {
                    user_id: body.user_id,
                    nama_pengeluaran: body.nama_pengeluaran,
                    deskripsi: body.deskripsi,
                    harga: body.harga
                }
            })

            return {
                status: true,
                code: 201,
                message: "Data Pengeluaran Berhasil Dibuat",
                data: createExpense
            }

        } catch (error) {
            console.error("addExpense module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    updateExpense = async (body, id) => {
        try {
            const schema = Joi.object({
                nama_pengeluaran: Joi.string().required(),
                deskripsi: Joi.string().required(),
                harga: Joi.number().required()
            })

            const validateResult = validate.validation(schema, body)

            if (!validateResult.status) {
                return validateResult
            }

            const updateExpense = await prisma.pengeluaran.update({
                where: {
                    id: id
                },
                data: {
                    nama_pengeluaran: body.nama_pengeluaran,
                    deskripsi: body.deskripsi,
                    harga: body.harga
                }
            })

            return {
                status: true,
                code: 201,
                message: "Data Pengeluaran Berhasil Diperbarui",
                data: updateExpense
            }

        } catch (error) {
            console.error("updateExpense module error: ", error)

            return {
                status: false,
                error
            }
        }
    }

    deleteExpense = async (id) => {
        try {
            const deleteExpense = await prisma.pengeluaran.delete({
                where: {
                    id: id
                }
            })

            return {
                status: true,
                statusCode: 200,
                message: "Data Pengeluaran Berhasil Dihapus",
                data: deleteExpense
            }

        } catch (error) {
            console.error("deleteExpense module error: ", error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _expense()