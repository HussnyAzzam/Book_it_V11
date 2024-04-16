import { useLoaderData } from 'react-router-dom'
import { apiRequestHandler } from '../apiReqHandler'
import { endPoints } from './endpoint'
import { useState } from 'react'
import DeleteModal from './components/DeleteModal'
import AppointmentForm from './forms/AppointmentForm'
const Appointment = () => {
    const { appointments } = useLoaderData()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState({})
    const [isReadOnly, setIsReadOnly] = useState(false)
    const hideDeleteModal = () => setShowDeleteModal(false)
    const displayDeleteModal = (appointment) => {
        setSelectedAppointment(appointment)
        setShowDeleteModal(true)
    }
    
    const [showFormModal, setShowFormModal] = useState(false)
    const editHandler = (appointment, readOnly) => {
        console.log('this', readOnly)
        setIsReadOnly(readOnly)
        if(appointment) setSelectedAppointment(appointment)
        setShowFormModal(true)
    }
    const addNewHandler = () => {
        setSelectedAppointment({})
        setShowFormModal(true)
    }
    const removeAppointment = async () => {
        console.log('selectedAppointment', selectedAppointment)
        const response = await apiRequestHandler(endPoints.appointment.DELETE + "/" + selectedAppointment.apiId, 'DELETE')
        setShowFormModal(false)
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">Appointment</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>
            <div className='flex flex-col gap-y-4 mt-10'>
                {appointments.map(appointment => (
                    <div className='flex items-center gap-x-5' key={appointment.id}>
                        <p>{(new Date(appointment?.date)).toTimeString()}</p>
                        <p>{appointment?.time}</p>
                        <button onClick={() => editHandler(appointment, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(appointment)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(appointment)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>
            {showDeleteModal && (
                <DeleteModal
                    title="Delete Appointment"
                    subtitle={`Are you sure you want to delete ${selectedAppointment.fName} ${selectedAppointment.lName}`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removeAppointment}
                />
            )}
            {showFormModal && (
                <AppointmentForm 
                    appointment={selectedAppointment}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}
        </div>
    )
}

export default Appointment