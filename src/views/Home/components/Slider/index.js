import React, { useState, useEffect } from 'react'
import Item from './components/Item'
import styles from './styles.module.css'

const Slider = props => {

  const [state, setState] = useState([])

  useEffect(() => {
    setState(props.data)
  }, [props.data])

  const nextItem = () => {
    const firstItem = state.shift()
    setState([...state, firstItem])
  }

  const prevItem = () => {
    const lastItem = state.pop()
    setState([lastItem, ...state])
  }

  return (
    <div>
      Slider
      <div className={styles.slider}>
        {state.map((story, i) => 
          <Item key={i} {...story}/>)}
      </div>
      <button onClick={prevItem}>Prev</button>
      <button onClick={nextItem}>Next</button>
    </div>
  )
}

export default Slider