import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({value, onChange}) => (<div>filter shown with <input value={value} onChange={onChange}/></div>)

const PersonForm = ({onSubmit, nameValue, onNameChange, numberValue, onNumberChange}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={nameValue} onChange={onNameChange}/>
      number: <input value={numberValue} onChange={onNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, handleDelete}) => (
  persons.map((person) => {
    return <p key={person.name}>{person.name} {person.number} <button onClick={handleDelete.bind(this, person)}>delete</button></p>
  })
)

const Notification = ({notification}) => {

  if (!notification) return null

  const notificationStyle = {
    color: notification.color,
    background: "lightgrey",
    fontSize: "24px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter((person)=>person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const showNotification = (message, color) => {
    setNotification({message, color})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    const previousEntry = persons.find(person=>(person.name===newName))
    if (!newName || !newNumber) {
      alert("Please enter a name and phonenumber")
    } else if (previousEntry) {
      if (window.confirm(`${previousEntry.name} is already added to phonebook, replace the old number with a new one?`)) {
        personObject.id = previousEntry.id
        personService
        .update(previousEntry.id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id === previousEntry.id ? personObject : person))
          setNewName('')
          setNewNumber('')
          showNotification(`Updated ${personObject.name}`, "green")
        }).catch(error => {
          showNotification(`Information of ${personObject.name} has already been removed from server`, "red")
          setPersons(persons.filter(person => person.id !== previousEntry.id))
        })
      }
    }
    else{
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${personObject.name}`, "green")
      }).catch(error => {
        showNotification(error.response.data, "red")
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .delete(personToDelete.id)
        .then(response => {
          const newPersons = persons.filter(person => person.id !== personToDelete.id)
          setPersons(newPersons)
          showNotification(`Deleted ${personToDelete.name}`, "green")
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification notification={notification}/>
        <Filter value={nameFilter} onChange={handleNameFilterChange}/>
      <h2>add a new</h2>
        <PersonForm onSubmit={onFormSubmit} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App