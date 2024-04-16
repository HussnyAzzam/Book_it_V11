import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import BusinessForm from './forms/BusinessForm'
import DeleteModal from './components/DeleteModal'
import { apiRequestHandler } from '../apiReqHandler'
import { endPoints } from './endpoint'
const Business = () => {
    const { businesses } = useLoaderData()

    const [isReadOnly, setIsReadOnly] = useState(false)
    const [showFormModal, setShowFormModal] = useState(false)
    const [selectedBusiness, setSelectedBusiness] = useState({})
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const hideDeleteModal = () => setShowDeleteModal(false)
    const editHandler = (user, readOnly) => {
        setIsReadOnly(readOnly)
        if (user) setSelectedBusiness(user)
        setShowFormModal(true)
    }

    const removeBusiness = async () => {
        const response = await apiRequestHandler(endPoints.user.DELETE + "/" + selectedBusiness._id, 'DELETE')
        setShowFormModal(false)
    }
    const [showBusinessForm, setShowBusinessForm] = useState(true)
    return (
        <div>
            <p className="text-3xl">Business</p>

            <div className='flex flex-col gap-y-4 mt-10'>
                {businesses.map(business => (
                    <div className='flex items-center gap-x-5' key={business.id}>
                        <p>{business?.name}</p>
                        <p>{business?.officialName}</p>
                        <button onClick={() => editHandler(user, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(user)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(user)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>
            {showBusinessForm &&
                <BusinessForm
                    closeModal={() => setShowBusinessForm(false)}
                />
            }
            {showDeleteModal && (
                <DeleteModal
                    title="Delete User"
                    subtitle={`Are you sure you want to delete ${selectedUser.fName} ${selectedUser.lName}`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removeBusiness}
                />
            )}
            {showFormModal && (
                <BusinessForm
                    business={selectedBusiness}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}
        </div>
    )
}

export default Business