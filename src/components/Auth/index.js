import React, { useState } from 'react'
import styles from './styles.module.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Api from './api'
import Service from './service'

const Authorization = props => {
  const [state, setState] = useState({
    formValid: false,
    values: {},
    error: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formType) {
      Api.login(state.values)
        .then(({authToken}) => {
          Service.saveToken(authToken)
          props.history.push('/app')
        })
        .catch(err => {
          setState({
            ...state,
            error: err.message
          })
        })
    } else {
      Api.signup(state.values)
        .then(() => {
          Api.login(state.values)
            .then(({authToken}) => {
              Service.saveToken(authToken)
              props.history.push('/app')
            })
            .catch(err => {
              setState({
                ...state,
                error: err.message
              })
            })  
        })
        .catch(err => {
          setState({
            ...state,
            error: err.message
          })
        })
    }
  } 

  const handleGuestLogin = () => {
    Api.login({
      user_name: 'guest',
      password: 'guest123'
    })
    .then(({authToken}) => {
      Service.saveToken(authToken)

      const { location, history } = props
      const destination = (location.state || {}).from || '/app/home'
      history.push(destination)
    })
    .catch(err => {
      setState({
        ...state,
        error: err.message
      })
    })
  }
  // switches fieldset
  const [formType, switchForm] = useState(true)
  const fieldset = formType ? <Login state={state} setState={setState}/> : <Signup state={state} setState={setState}/>
  const btnTitle = formType ? 'Signup' : 'Login'

  const handleFormSwitch = () => {
    setState({
      formValid: false,
      values: {},
      error: null,  
    })
    switchForm(!formType)
  }

  return (
    <section className={styles.Auth}>
      <form onSubmit={handleSubmit}>
        {fieldset}
      </form>
      <div className={styles.btnWrapper}>
        <button id='switch' type='button' onClick={handleFormSwitch}>{btnTitle}</button>
        <button type='button' onClick={handleGuestLogin}>Continue as a guest</button>
      </div>
    </section>
  )
}

export default Authorization
