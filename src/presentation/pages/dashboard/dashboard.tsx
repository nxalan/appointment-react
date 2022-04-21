import React from "react"
import { DeleteAppointment, LoadAppointments } from "@/domain/usecases"

type Props = {
  loadAppointments: LoadAppointments
  deleteAppointment: DeleteAppointment
}

const Dashboard: React.FC<Props> = ({ loadAppointments, deleteAppointment }: Props) => {
  return (
    <div>
    </div>
  )
}

export default Dashboard