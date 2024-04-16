import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { apiRequestHandler } from '../apiReqHandler'
import { endPoints } from './endpoint'
import DeleteModal from './components/DeleteModal'
import ExternalCustomerForm from './forms/ExternalCustomerForm'
const ExternalCustomers = () => {
    const { externalCustomers } = useLoaderData()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState({})
    const [isReadOnly, setIsReadOnly] = useState(false)
    const hideDeleteModal = () => setShowDeleteModal(false)
    const displayDeleteModal = (person) => {
        setSelectedCustomer(person)
        setShowDeleteModal(true)
    }

    const [showFormModal, setShowFormModal] = useState(false)
    const editHandler = (person, readOnly) => {
        console.log('this', readOnly)
        setIsReadOnly(readOnly)
        if (person) setSelectedCustomer(person)
        setShowFormModal(true)
    }
    const addNewHandler = () => {
        setIsReadOnly(false)
        setSelectedCustomer({})
        setShowFormModal(true)
    }
    const removeExternalCustomer = async () => {
        const response = await apiRequestHandler(endPoints.externalCustomers.DELETE + "/" + selectedCustomer._id, 'DELETE')
        setShowFormModal(false)
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">External Customers</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>
            <div className='flex flex-col gap-y-4 mt-10'>
                {externalCustomers.map(customer => (
                    <div className='flex items-center gap-x-5' key={customer.id}>
                        <p>{customer?.fName}</p>
                        <p>{customer?.lName}</p>
                        <button onClick={() => editHandler(customer, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(customer)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(customer)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>
            {showDeleteModal && (
                <DeleteModal
                    title="Delete Person"
                    subtitle={`Are you sure you want to delete ${selectedCustomer.fName} ${selectedCustomer.lName}`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removeExternalCustomer}
                />
            )}
            {showFormModal && (
                <ExternalCustomerForm
                    customer={selectedCustomer}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}
        </div>
    )
}

export default ExternalCustomers