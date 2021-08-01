import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({persons}) => (
  persons.map((person) => 
    <p key={person.name}>{person.name} {person.number}</p>
  )
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter((person)=>person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) {
      alert("Please enter a name and phonenumber")
    } else if (persons.some((person)=>(person.name===newName))) {
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={nameFilter} onChange={handleNameFilterChange}/>
      <h2>add a new</h2>
        <PersonForm onSubmit={onFormSubmit} nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons={personsToShow}/>
    </div>
  )
}

export default App