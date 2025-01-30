import dotenv from 'dotenv'
dotenv.config()
import express, { static as xStatic , json } from 'express'
import morgan, { token } from 'morgan'
import cors from 'cors'
const app = express()
import Person from './models/person.js'

app.use(xStatic('dist'))
app.use(json())
token('body', (request) => JSON.stringify(request.body))
app.use(morgan('tiny'))
app.use(cors())


app.get('/hello', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/health', (request, response) => {
  response.send('ok')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :body') , (request, response, next) => {
  if (!(request.body.name && request.body.number)) {
    response.status(400).send({ 'error': 'missing name or number' })
  } else {
    const newPerson = new Person({
      'name': request.body.name,
      'number': request.body.number
    })
    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
      .catch(error => next(error))
  }
})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.send(`
      <div>
        Phonebook has info for ${result.length} people
      </div>
      <br/>
      <div>
        ${new Date()}
      </div>
      `
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, { number: request.body.number })
    .then(() => {
      response.status(200).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app