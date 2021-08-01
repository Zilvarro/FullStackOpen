import React from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => (
  <p>{name} {exercises}</p>
)

const Content = ({parts}) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
    ))}
  </div>
)

const Total = ({parts}) => {
  const exercisecount = parts.reduce((accumulator, part)=> accumulator + part.exercises, 0)
  return <p>Number of exercises {exercisecount}</p>
}

const Course = ({course}) => (
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
)

export default Course