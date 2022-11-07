const request = require('supertest')
const app = require('./server')

let token
let firstUserId

describe('User Api Testing', () => {

    test('Add User 1', async () => {
        const res = await request(app).post('/api/user').send({
            nama: "Samsudin",
            email: "samsudin@gmail.com",
            password: "12345678"
        })
        expect(res.statusCode).toBe(200)
    })

    test('Add User 2', async () => {
        const res = await request(app).post('/api/user').send({
            nama: "Hanayama",
            email: "hanayama@gmail.com",
            password: "12345678"
        })
        expect(res.statusCode).toBe(200)
    })

    test('Login', async () => {
        const res = await request(app).post('/api/login').send({
            email: "samsudin@gmail.com",
            password: "12345678"
        })
        expect(res.statusCode).toBe(200)
        token = res.body.data.token
    })

    test('List User', async () => {
        const res = await request(app).get('/api/user')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        firstUserId = res.body.data[0].id
    })

    test('Update User', async () => {
        const res = await request(app).put(`/api/user/${firstUserId}`)
        .set('Authorization', `Bearer ${token}`).send({
            nama: "dwi",
            email: "dwi@gmail.com",
            password: "12345678"
        })
        expect(res.statusCode).toBe(200)
    })

    test('Delete User', async () => {
        const res = await request(app).delete(`/api/user/${firstUserId}`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})