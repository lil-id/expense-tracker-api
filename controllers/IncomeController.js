const { Router } = require('express');
const m$income = require('../modules/income.module');
const response= require('../helpers/response');
const userSession = require('../helpers/middleware')

const IncomeController = Router();

IncomeController.get('/', userSession, async (req,res)=> {
   const list = await m$income.listIncome(Number(req.user.id))
   response.sendResponse(res, list)
})

IncomeController.post('/', userSession, async (req,res) => {
    const add = await m$income.addIncome({
        user_id: req.user.id,
        nama_pemasukan: req.body.nama_pemasukan, 
        deskripsi: req.body.deskripsi,
        harga: req.body.harga,
    })
    response.sendResponse(res, add)
})

IncomeController.put('/:id', userSession, async (req,res) => {
    const { id } = req.params
    const update = await m$income.updateIncome(req.body, id)
    response.sendResponse(res, update)
})

IncomeController.delete('/:id', userSession, async (req,res) => {
    const del = await m$income.deleteIncome(Number(req.params.id))
    response.sendResponse(res, del)
})

module.exports = IncomeController