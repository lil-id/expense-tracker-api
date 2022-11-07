const { Router } = require('express');
const m$expense = require('../modules/expense.module');
const response = require('../helpers/response');

const ExpenseController = Router();

ExpenseController.get('/', async (req, res) => {
    const list = await m$expense.listExpense()
    response.sendResponse(res, list)
})

ExpenseController.post('/', async (req, res) => {
    const add = await m$expense.addExpense(req.body)
    response.sendResponse(res, add)
})

ExpenseController.put('/:id', async (req, res) => {
    const update = await m$expense.updateExpense(req.body, Number(req.params.id))
    response.sendResponse(res, update)
})

ExpenseController.delete('/:id', async (req, res) => {
    const del = await m$expense.deleteExpense(Number(req.params.id))
    response.sendResponse(res, del)
})

module.exports = ExpenseController