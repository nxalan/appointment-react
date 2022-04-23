import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeAddAppointment: React.FC
  makeEditAppointment: React.FC
  makeDashboard: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/agendamento" exact component={factory.makeAddAppointment} />
        <Route path="/" exact component={factory.makeDashboard} />
        <Route path="/agendamento/:id" exact component={factory.makeEditAppointment} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
