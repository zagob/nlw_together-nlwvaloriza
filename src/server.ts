import express from "express";

const app = express();

app.get("/test", (request, response) => {
    return response.send("Olá NLW")
})

app.post("/test-post", (request, response) => {
    console.log('ol')
})

app.listen(3334, () => console.log('Server is running 🚀'))