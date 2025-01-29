import { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Persons from './components/Persons'
import backendService from './services/backendService'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    backendService
      .getAll()
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const checkName = persons.find(person => person.name === newName)
    if (checkName) {
      if (window.confirm(`Update new number for ${checkName.name}?`)) {
        checkName.number = newNumber
        backendService
          .updatePerson(checkName)
          .then(() => {
            setNotificationMessage(`Updated number for ${checkName.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    } else {
      backendService
        .addNew(personObject)
        .then(() => {
          setPersons(persons.concat(personObject));
          setNotificationMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const contact = persons.find(c => c.id === id)
    if (window.confirm(`Delete ${contact.name}?`)) {
      backendService
        .deletePerson(id)
        .then(console.log(`Deleted ${contact.name}`))
        .catch(error => {
          setErrorMessage(`User ${contact.name} has already been deleted`)
          console.log(error.data)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setPersons(persons.filter(contact => contact.id !== id))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = filterValue ?
    persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())) :
    persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text="filter contacts" filterValue={filterValue} onChange={handleFilterChange}/>
      <h3>Add new contact</h3>      
      <ContactForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addContact={addPerson}
      />
      <Notification message={notificationMessage}/>
      <Error  message={errorMessage}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} del={deletePerson} />
    </div>
  )
}

export default App