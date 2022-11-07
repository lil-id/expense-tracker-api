const request = require('supertest')
const app = require('./server')
const jwt = require("jsonwebtoken");

let token
let firstExpenseId

describe('Expense Api Testing', () => {
    test('Login', async () => {
        const res = await request(app).post('/api/login').send({
            email: "xxx@gmail.com",
            password: "12345678"
        })
        expect(res.statusCode).toBe(200)
        token = res.body.data.token
    })

    test('Add Expense', async () => {
        const decoded = jwt.verify(token, process.env.TOKEN_CODE)
        const res = await request(app).post('/api/expense')
        .set('Authorization', `Bearer ${token}`).send({
            user_id: decoded.id,
            nama_pengeluaran: "Beli Nasi Kuning",
            deskripsi: "Untuk sarapan pagi ini",
            harga: 100000
        })
        expect(res.statusCode).toBe(200)
    })

    test('List Expense', async () => {
        const res = await request(app).get('/api/expense')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        firstExpenseId = res.body.data[0].id
    })

    test('Update Expense', async () => {
        const res = await request(app).put(`/api/expense/${firstExpenseId}`)
        .set('Authorization', `Bearer ${token}`).send({
            nama_pengeluaran: "Beli Beras",
            deskripsi: "Untuk makan minggu ini",
            harga: 700000
        })
        expect(res.statusCode).toBe(200)
    })

    test('Delete Expense', async () => {
        const res = await request(app).delete(`/api/expense/${firstExpenseId}`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})