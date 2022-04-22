import React from "react"
import { DeleteAppointment, LoadAppointments } from "@/domain/usecases"
import { Header, Footer } from "@/presentation/components"
import Styles from './dashboard-styles.scss'

type Props = {
  loadAppointments: LoadAppointments
  deleteAppointment: DeleteAppointment
}

const Dashboard: React.FC<Props> = ({ loadAppointments, deleteAppointment }: Props) => {
  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard