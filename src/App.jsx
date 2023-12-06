import { useState, useReducer, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const nameArr = [{
    name: "Surya",
    visible: true
  }]

  const inputRef = useRef(0)

  const reducer = (initArr, action) => {
    switch (action.type) {
      case "ADD":
        return [...initArr, { name: action.data, visible: true }]
      case "CHANGE":
        return initArr.map((item, index) => {
          if (action.index === index) {
            return { ...item, visible: !item.visible }
          }
          return item
        })
      default:
        return initArr
    }
  }

  const [state, dispatch] = useReducer(reducer, nameArr)

  const [name, setName] = useState('')
  function handleChange(e) {
    setName(e.target.value)
  }
  function handleAdd() {
    dispatch({ type: "ADD", data: name })
    setName('')
  }
  function handleToggle(index) {
    dispatch({ type: "CHANGE", index })
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
      <input ref={inputRef} type="text" value={name} onChange={handleChange} onKeyDown={handleKeyDown} />
      {state.map((item, index) => {
        return (
          <div key={index} className='content'>
            <b> <p className='heading'>{item.visible ? item.name : "The Content is Hidden "}</p> </b>
            <button onClick={() => handleToggle(index)}>Toggle</button>
          </div>
        )
      })}
      <button onClick={() => inputRef.current.focus()}>Get back writing</button>
    </>
  )
}

export default App
