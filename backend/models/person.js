import { set, connect, Schema, model } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

set('strictQuery', false)

const url = process.env.MONGODB_URI
if (process.env.NODE_ENV !== 'test') {
  console.log('connecting to', url)
  connect(url)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch(error => {
      console.log('error connecting to MongoDB: ', error.message)
    })
}

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (s) => {
        return /^\d{2,3}-\d{5,}$/.test(s)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = model('Person', personSchema)

export default Person
