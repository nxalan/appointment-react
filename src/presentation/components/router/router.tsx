import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeAddAppointment: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/add-appointment" exact component={factory.makeAddAppointment} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
