import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeAddAppointment } from './factories/pages/add-appointment/add-appointment-factory'
import { makeEditAppointment } from './factories/pages/edit-appointment/edit-appointment-factory'
import { makeDashboard } from './factories/pages/dashboard/dashboard-factory'
<script src="/bundle.js"></script>

ReactDOM.render(
  <Router
    makeAddAppointment = {makeAddAppointment}
    makeEditAppointment = {makeEditAppointment}
    makeDashboard = {makeDashboard}
  />,
  document.getElementById('main')
)
