const request = require('supertest')
const app = require('./server')

describe('Income Api Testing', () => {
    test('Add Income', async () => {
        const res = await request(app).post('/api/income').send({
            user_id: 1,
            nama_pemasukan: "Kalung",
            deskripsi: "Bahan bahan terbaik",
            harga: 100000
        })
        expect(res.statusCode).toBe(200)
    })
    test('List Income', async () => {
        const res = await request(app).get('/api/income')
        expect(res.statusCode).toBe(200)
    })
    test('Update Income', async () => {
        const res = await request(app).put('/api/income/15').send({
            nama_pemasukan: "Topit",
            deskripsi: "Bahan bahan terbaiks",
            harga: 700000
        })
        expect(res.statusCode).toBe(200)
        
    })
    test('Delete Income', async () => {
        const res = await request(app).delete('/api/income/9')
        expect(res.statusCode).toBe(200)
    })
})