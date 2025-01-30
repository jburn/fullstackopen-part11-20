import request from 'supertest'
import app from './index.js'

test('Get helloworld from root url', async () => {
    const resp = await request(app).get('/hello')
    expect(resp.statusCode).toBe(200)
    expect(resp.text).toBe('<h1>Hello World!</h1>')
})