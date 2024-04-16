import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { useNavigation } from 'react-router-dom'
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const AppointmentForm = ({ appointment, closeModal, readOnly }) => {
    const branchId = useInput(appointment?.branchId || "")
    const userId = useInput(appointment?.userId || "")
    const firstName = useInput("")
    const lastName = useInput("")
    const name = `${firstName.value} ${lastName.value}`
    const title = useInput("")
    const email = useInput(appointment?.email || "")
    const phone = useInput(appointment?.phone || "")
    const address1 = useInput("")
    const city = useInput("")
    const state = useInput("")
    const website = useInput("")
    const calendarNotes = useInput("")
    const [status, setStatus] = useState(appointment?.status || "")
    const selectedSlot = useInput(appointment?.selectedSlot || "")
    const selectedTimezone = useInput(appointment?.selectedTimezone || "")
    const calendarId = useInput(appointment?.calendarId || "")
    const navigate = useNavigation()

    const pageTitle = readOnly ? "" : (appointment?.branchId ? "Edit Appointmetn" : "Add New Appointment")
    const submitForm = async (e) => {
        const url = appointment?.branchId ? endPoints.appointment.UPDATE + "/" + appointment.id : endPoints.appointment.CREATE
        const method = appointment.branchId ? 'PUT' : 'POST'
        e.preventDefault()
        const response  = await apiRequestHandler(url, method, {
            email: email.value,
            phone: phone.value,
            firstName: firstName.value,
            lastName: lastName.value,
            selectedSlot: selectedSlot.value,
            selectedTimezone: selectedTimezone.value,
            calendarId: calendarId.value,
            name: name,
            title: title.value,
            address1: address1.value,
            city: city.value,
            state: state.value,
            website: website.value,
            calendarNotes: calendarNotes.value,
            branchId: branchId.value,
            userId: userId.value,
        })

        console.log(response, 'response')
        if(response.appointment) navigate('/persons')
    }

    console.log('readOnly', readOnly)
    return (
        <div className="modal-container">
            <div onClick={closeModal} className="modal-background">
            </div>
            <form className="bg-white rounded-md px-6 py-3 w-1/2 pb-10 overflow-y-auto h-full" onSubmit={submitForm}>
                <h3 className="text-2xl">{pageTitle}</h3>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email">Email</label>
                        <input readOnly={readOnly} required className="" type="email" id="email" {...email} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="phone">Phone</label>
                        <input readOnly={readOnly}  required className="" type="number" id="phone" {...phone} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="firstname">First Name</label>
                        <input readOnly={readOnly} className="" type="text" id="firstname" {...firstName} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="lastName">Last Name</label>
                        <input readOnly={readOnly} className="" type="text" id="lastName" {...lastName} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="title">Title</label>
                        <input readOnly={readOnly} className="" type="text" id="title" {...title} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="address1">Address</label>
                        <input readOnly={readOnly} className="" type="text" id="address1" {...address1} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="city">City</label>
                        <input readOnly={readOnly} className="" type="text" id="city" {...city} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="state">State</label>
                        <input readOnly={readOnly} className="" type="text" id="state" {...state} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="website">Website</label>
                        <input readOnly={readOnly} className="" type="text" id="website" {...website} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="calendarId">Calendar Id</label>
                        <input readOnly={readOnly} className="" type="text" id="calendarId" {...calendarId} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="calendarNotes">Calendar Notes</label>
                        <input readOnly={readOnly} className="" type="text" id="calendarNotes" {...calendarNotes} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="slot">Select Slot</label>
                        <input readOnly={readOnly} required className="" type="text" id="slot" {...selectedSlot} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="timezone">Select Timezone</label>
                        <input readOnly={readOnly} required className="" type="text" id="timezone" {...selectedTimezone} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="branchId">Branch Id</label>
                        <input readOnly={readOnly} required className="" type="text" id="branchId" {...branchId} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="userId">User Id</label>
                        <input readOnly={readOnly} required className="" type="text" id="userId" {...userId} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="status">Status</label>
                        <select id="type" onChange={e => setStatus(e.target.value)} value={status}>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="deleted">Deleted</option>
                            <option value="Showed">Showed</option>
                            <option value="Noshow">Noshow</option>
                            <option value="Invalid">Invalid</option>
                        </select>
                    </div>

                </div>
                <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{appointment.branchId ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    )
}

export default AppointmentForm