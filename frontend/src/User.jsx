import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { endPoints } from './endpoint'
import { apiRequestHandler } from '../apiReqHandler'
import DeleteModal from './components/DeleteModal'
import UserForm from './forms/UserForm'
const Users = () => {
    const { users } = useLoaderData()

    const [showAdminUserModal, setShowAdminUserModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [isReadOnly, setIsReadOnly] = useState(false)
    const hideDeleteModal = () => setShowDeleteModal(false)
    const displayDeleteModal = (user) => {
        setSelectedUser(user)
        setShowDeleteModal(true)
    }

    const [showFormModal, setShowFormModal] = useState(false)
    const editHandler = (user, readOnly) => {
        setIsReadOnly(readOnly)
        if (user) setSelectedUser(user)
        setShowFormModal(true)
    }
    const addNewHandler = () => {
        setSelectedUser(undefined)
        setShowFormModal(true)
    }
    const removeUser = async () => {
        const response = await apiRequestHandler(endPoints.user.DELETE + "/" + selectedUser._id, 'DELETE')
        setShowFormModal(false)
    }

    const handleMakeAdmin = async (user) => {
        setSelectedUser(user)
        setShowAdminUserModal(true)
    }

    const makeAdmin = async () => {
        console.log('dkfjaljfal')
        console.log(selectedUser)
        const response = await apiRequestHandler(`${endPoints.user.MAKE_ADMIN}`, 'POST', {
            businessId: selectedUser.businessId,
            email: selectedUser.email,
            contact: {
                _id: selectedUser._id,
                id: selectedUser.id,
                fName: selectedUser.fName,
                lName: selectedUser.lName,
                mobile: {
                    number: selectedUser?.mobile?.number,
                    countryCode: selectedUser?.mobile?.countryCode
                },
                email: selectedUser?.email
            },
            active: true,
            mobile: {
                number: selectedUser?.mobile?.number,
                countryCode: selectedUser?.mobile?.countryCode
            },
        })
        console.log('here', response)
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">Users</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>
            <div className='flex flex-col gap-y-4 mt-10'>
                {users.map(user => (
                    <div className='flex items-center gap-x-5' key={user.id}>
                        <p>{user?.fName}</p>
                        <p>{user?.lName}</p>
                        <p>{user?.email}</p>
                        <button onClick={() => editHandler(user, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => handleMakeAdmin(user)} className='mr-10 px-6 py-2 rounded-md bg-yellow-600 text-white'>Make Admin</button>
                        <button onClick={() => editHandler(user)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(user)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>

            {showDeleteModal && (
                <DeleteModal
                    title="Delete User"
                    subtitle={`Are you sure you want to delete ${selectedUser.fName} ${selectedUser.lName}`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removeUser}
                />
            )}
            {showFormModal && (
                <UserForm
                    user={selectedUser}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}
            {showAdminUserModal && (
                <div className="modal-container">
                    <div className='modal-background' onClick={() => setShowAdminUserModal(false)}></div>
                    <div className="bg-white rounded-lg px-4 py-3 z-10">
                        <h3 className='mb-3 text-2xl'>Make Admin</h3>
                        <p className='mb-5'>Are you sure you want to make {selectedUser.fName} {selectedUser.lName} an admin</p>
                        <div className="flex gap-x-4 justify-end">
                            <button onClick={() => setShowAdminUserModal(false)} className="py-2 px-6 border-2 rounded-md">Cancel</button>
                            <button onClick={makeAdmin} className="bg-red-500 text-white px-6 py-2 rounded-md">Proceed</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Users