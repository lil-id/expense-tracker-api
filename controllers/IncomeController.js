const { Router } = require('express');
const m$income = require('../modules/income.module');
const response= require('../helpers/response');

const IncomeController = Router();

IncomeController.get('/', async (req,res)=> {
   const list = await m$income.listIncome()
   response.sendResponse(res, list)
})

IncomeController.post('/', async (req,res) => {
    const add = await m$income.addIncome(req.body)
    response.sendResponse(res, add)
})

IncomeController.put('/:id', async (req,res) => {
    const { id } = req.params
    const update = await m$income.updateIncome(req.body, id)
    response.sendResponse(res, update)
})

IncomeController.delete('/:id', async (req,res) => {
    const del = await m$income.deleteIncome(Number(req.params.id))
    response.sendResponse(res, del)
})

module.exports = IncomeController