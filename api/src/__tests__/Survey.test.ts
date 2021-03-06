import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Surveys", async () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title Example2",
            description: "Description Example2"
        })

        const response = request(app).get("/surveys")

        expect((await response).body.length).toBe(2)
    })
})