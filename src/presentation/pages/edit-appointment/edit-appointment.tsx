import React from "react"
import { EditAppointment, LoadAppointment, LoadRestrictedDates } from "@/domain/usecases"

type Props = {
  loadAppointment: LoadAppointment
  editAppointment: EditAppointment
  loadRestrictedDates: LoadRestrictedDates
}

const EditAppointment: React.FC<Props> = ({ loadAppointment, editAppointment, loadRestrictedDates }: Props) => {
  return (
    <div>
    </div>
  )
}

export default EditAppointment