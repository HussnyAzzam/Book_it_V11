import { useLoaderData } from 'react-router-dom'
import { apiRequestHandler } from '../apiReqHandler'
import { endPoints } from './endpoint'
import { useState } from 'react'
import DeleteModal from './components/DeleteModal'
import ServiceForm from './forms/ServiceForm'
const Services = () => {
    const { services } = useLoaderData()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedService, setSelectedService] = useState({})
    const [isReadOnly, setIsReadOnly] = useState(false)
    const hideDeleteModal = () => setShowDeleteModal(false)
    const displayDeleteModal = (person) => {
        setSelectedService(person)
        setShowDeleteModal(true)
    }

    const [showFormModal, setShowFormModal] = useState(false)
    const editHandler = (person, readOnly) => {
        console.log('this', readOnly)
        setIsReadOnly(readOnly)
        if (person) setSelectedService(person)
        setShowFormModal(true)
    }
    const addNewHandler = () => {
        setSelectedService({})
        setShowFormModal(true)
    }
    const removePerson = async () => {
        const response = await apiRequestHandler(endPoints.services.DELETE + "/" + selectedService.id, 'DELETE')
        setShowFormModal(false)
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">Services</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>

            <div className='flex flex-col gap-y-4 mt-10'>
                {services.map(service => (
                    <div className='flex items-center gap-x-5' key={service.id}>
                        <p>{service?.name}</p>
                        <button onClick={() => editHandler(service, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(service)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(service)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>

            {showDeleteModal && (
                <DeleteModal
                    title="Delete Person"
                    subtitle={`Are you sure you want to delete ${selectedService.fName} ${selectedService.lName}`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removePerson}
                />
            )}
            {showFormModal && (
                <ServiceForm
                    serviceObj={selectedService}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}

        </div>
    )
}

export default Services