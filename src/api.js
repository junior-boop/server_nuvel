import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono() 

app.use('*', cors());

app.get("/", (request) => {
    return request.json({ville : "yaounde"})
})

export default app