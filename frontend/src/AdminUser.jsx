import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import DeleteModal from './components/DeleteModal'
import AdminUserForm from './forms/AdminUserForm'
import { apiRequestHandler } from '../apiReqHandler'
import { endPoints } from './endpoint'
const AdminUser = () => {
    const { adminUsers } = useLoaderData()

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
    const removeAdminUser = async () => {
        const response = await apiRequestHandler(endPoints.adminUser.DELETE + "/" + selectedUser._id, 'DELETE')
        setShowFormModal(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">Admin Users</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>

            <div className='flex flex-col gap-y-4 mt-10'>
                {adminUsers.map(adminUser => (
                    <div className='flex items-center gap-x-5' key={adminUser.id}>
                        <p>{adminUser?.contact?.fName}</p>
                        <p>{adminUser?.contact?.lName}</p>
                        <p>{adminUser?.email}</p>
                        <button onClick={() => editHandler(adminUser, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(adminUser)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(adminUser)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>

            {showDeleteModal && (
                <DeleteModal
                    title="Delete Admin User"
                    subtitle={`Are you sure you want to delete ${selectedUser.fName} ${selectedUser.lName}`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removeAdminUser}
                    
                />
            )}
            {showFormModal && (
                <AdminUserForm
                    adminUser={selectedUser}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}

        </div>
    )
}

export default AdminUser