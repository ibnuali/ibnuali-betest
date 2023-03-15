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


describe('Account Test', () => {
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

    describe('Account Services', () => {
       
        it('should return token if user is logged in', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/account/login')
                .send({
                    username: userData.userName,
                    password: userData.password,
                })

            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
        })
        it('should return error if user is not logged in', async () => {
            const res = await chai
                .request(app)
                .post('/api/v1/account/login')
                .send({
                    username: userData.userName,
                    password: 'wrong password',
                })

            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
        })
        it('should return account if lastLoginDateTime is < 3 days', async () => {
            const res = await chai
                .request(app)
                .get('/api/v1/account/last-login')
                .set('Authorization', `Bearer ${token}`)

            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
        })
    })
})
