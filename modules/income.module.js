const prisma = require('../helpers/databse')
const Joi = require('joi')

class _income{
    listIncome = async (body) => {
        try {
            const list = await prisma.pemasukan.findMany({
                include: {
                    user: true
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: "Data Income Berhasil Diambil",
                data: list
            }
        } catch (error) {
            console.error('list Income module error : ', error)
            return {
                status: false,
                error
            }
        }
    }
    addIncome = async (body) => {
        try {
            const schema = Joi.object({
                user_id: Joi.number().required(),
                nama_pemasukan: Joi.string().required(),
                deskripsi: Joi.string().required(),
                harga: Joi.number().required(),
            }).options({
                abortEarly: false
            })
            const validation = schema.validate(body)
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            const newIncome = await prisma.pemasukan.create({
                data: {
                    user_id: body.user_id,
                    nama_pemasukan: body.nama_pemasukan,
                    deskripsi: body.deskripsi,
                    harga: body.harga,
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: "Data Income Berhasil diBuat",
                data: newIncome
            }
        } catch (error) {
            console.error('add Income module error : ', error)
            return {
                status: false,
                error
            }
        }
    }

    updateIncome = async (body, id) => {
        try {
            const schema = Joi.object({
                nama_pemasukan: Joi.string().required(),
                deskripsi: Joi.string().required(),
                harga: Joi.number().required(),
            }).options({
                abortEarly: false
            })
            const validation = schema.validate(body)
            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            const updateIncome = await prisma.pemasukan.update({
                where:{
                    id: Number(id)
                },
                data: {
                    nama_pemasukan: body.nama_pemasukan,
                    deskripsi: body.deskripsi,
                    harga: body.harga,
                }
            })
            return {
                status: true,
                statusCode: 201,
                message: "Data Income Berhasil DiUpdate",
                data: updateIncome
            }
        
        } catch (error) {
            console.error('update Income module error : ', error)
            return {
                status: false,
                error
            }
        }
    }
    deleteIncome = async (id) => {
        try {
            const delIncome = await prisma.pemasukan.delete({
                where:{
                    id: id
                },
                
            })
            return {
                status: true,
                statusCode: 201,
                message: "Data Income Berhasil delete",
                data: delIncome
            }
        
        } catch (error) {
            console.error('delete Income module error : ', error)
            return {
                status: false,
                error
            }
        }
    }
}
module.exports = new _income()