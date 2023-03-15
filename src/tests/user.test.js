const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../index')

chai.use(chaiHttp)
let token
let userId
const userData = {
    fullName: 'test user',
    accountNumber: '12012120',
    email: 'usertest@gmail.com',
    registrationNumber: '12111',
    userName: 'usertest',
    password: 'usertest123',
}

const userDataSecond = {
    fullName: 'test user 2',
    accountNumber: '120121201221',
    email: 'usertest2@gmail.com',
    registrationNumber: '1211411',
    userName: 'usertest2',
    password: 'usertest123',
}

describe('User Test', () => {
    beforeEach(async () => {
        const res = await chai.request(app).post('/api/v1/user').send(userData)
        expect(res).to.have.status(201)
    })

    beforeEach(async () => {
        const res = await chai
            .request(app)
            .post('/api/v1/account/login')
            .send({ username: userData.userName, password: userData.password })
        expect(res).to.have.status(200)
        token = res.body.token
        userId = res.body.userId
    })

    afterEach(async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res).to.have.status(204)
    })

    describe('User Services', () => {
        it('should return user by id', async () => {
            const res = await chai
                .request(app)
                .get(`/api/v1/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(res).to.have.status(200)
            expect(res.body.data).to.be.an('object')
        })
        it('should return all users', async () => {
            const res = await chai
                .request(app)
                .get('/api/v1/user')
                .set('Authorization', `Bearer ${token}`)

            expect(res).to.have.status(200)
            expect(res.body.data).to.be.an('array')
        })
        it('should return user by account number', async () => {
            const res = await chai
                .request(app)
                .get(`/api/v1/user/account-number/${userData.accountNumber}`)
                .set('Authorization', `Bearer ${token}`)

            expect(res).to.have.status(200)
            expect(res.body.data).to.be.an('object')
        })
        it('should return user by registration number', async () => {
            const res = await chai
                .request(app)
                .get(
                    `/api/v1/user/registration-number/${userData.registrationNumber}`
                )
                .set('Authorization', `Bearer ${token}`)

            expect(res).to.have.status(200)
            expect(res.body.data).to.be.an('object')
        })
        it('should create user', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/user')
                .send(userDataSecond)
            expect(res).to.have.status(201)
            expect(res.body.data).to.be.an('object')

            const user = await chai
                .request(app)
                .delete(`/api/v1/user/${res.body.data.userId}`)
                .set('Authorization', `Bearer ${token}`)
            expect(user).to.have.status(204)
        })
        it('should update user by id', async () => {
            const res = await chai
                .request(app)
                .patch(`/api/v1/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ fullName: 'updated user' })

            expect(res).to.have.status(200)
            expect(res.body.data).to.be.an('object')
        })
    })
})
