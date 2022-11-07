const { Router } = require('express');
const m$expense = require('../modules/expense.module');
const response = require('../helpers/response');
const userSession = require('../helpers/middleware')

const ExpenseController = Router();

ExpenseController.get('/', userSession, async (req, res) => {
    const list = await m$expense.listExpense()
    response.sendResponse(res, list)
})

ExpenseController.post('/', userSession, async (req, res) => {
    const add = await m$expense.addExpense({ 
        user_id: req.user.id,
        nama_pengeluaran: req.body.nama_pengeluaran, 
        deskripsi: req.body.deskripsi,
        harga: req.body.harga,
    })
    response.sendResponse(res, add)
})

ExpenseController.put('/:id', userSession, async (req, res) => {
    const update = await m$expense.updateExpense(req.body, Number(req.params.id))
    response.sendResponse(res, update)
})

ExpenseController.delete('/:id', userSession, async (req, res) => {
    const del = await m$expense.deleteExpense(Number(req.params.id))
    response.sendResponse(res, del)
})

module.exports = ExpenseController