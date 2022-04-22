import React, { useState, useEffect } from "react"
import { DeleteAppointment, LoadAppointments } from "@/domain/usecases"
import { Header, Footer, Table } from "@/presentation/components"
import Styles from './dashboard-styles.scss'

type Props = {
  loadAppointments: LoadAppointments
  deleteAppointment: DeleteAppointment
}

const Dashboard: React.FC<Props> = ({ loadAppointments, deleteAppointment }: Props) => {
  const [appointmentsList, setAppointmentsList] = useState([])

  useEffect(() => {
    loadAppointments.loadAll().then((appointments) => {
      setAppointmentsList(appointments)
    })
  }, [])

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
        <Table rows={appointmentsList}/>
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard