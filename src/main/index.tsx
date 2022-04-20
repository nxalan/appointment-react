import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeAddAppointment } from './factories/pages/add-appointment/add-appointment-factory'

ReactDOM.render(
  <Router
    makeAddAppointment = {makeAddAppointment}
  />,
  document.getElementById('main')
)
