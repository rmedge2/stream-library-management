const request = require("supertest");
const app = require("../app");
const db = require('../db')

describe("The /books endpoint", () => {
    describe(" for GET requests", () => {

        beforeEach(async () => {
            await db('books').insert([
                {title: "JavaScript Design Patterns", author: "Addy Osmani"},
                {title: "The Things They Carry", author: "Unknown"}
            ])
        })

        afterEach(async () => {
            await db('books').del()
        })
        test("responds with a list of books", async () =>{
            // unfulfilled
            // SEAT
            // SETUP & EXECUTE
            const response = await request(app).get('/books');
            // ASSERT
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveLength(2)
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body[0]).toHaveProperty('title')
            expect(response.body[0]).toHaveProperty('author')
        })
    });

    describe(" for POST requests", () => {
        
        test("creates a new book and responds with the new book", async () => {
            // SEAT
            const newBook = { title: "The Scout Mindset", author: "Julia Galef" }

            const response = await request(app).post('/books').send(newBook)

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty("id")
            expect(response.body.title).toHaveProperty(newBook.title)
            expect(response.body.author).toHaveProperty(newBook.author)
        })
    })

    
});