import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeAddAppointmentPage } from './factories/pages/add-appointment/add-appointment-factory'
import { makeEditAppointmentPage } from './factories/pages/edit-appointment/edit-appointment-factory'
import { makeDashboardPage } from './factories/pages/dashboard/dashboard-factory'
import { makeHomePage } from './factories/pages/home-page/home-page-factory'

ReactDOM.render(
  <Router
    makeAddAppointment = {makeAddAppointmentPage}
    makeEditAppointment = {makeEditAppointmentPage}
    makeDashboard = {makeDashboardPage}
    makeHomePage = {makeHomePage}
  />,
  document.getElementById('main')
)
