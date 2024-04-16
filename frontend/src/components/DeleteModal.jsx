
const DeleteModal = ({ title, subtitle, closeModal, deleteHandler}) => {
    return (
        <div className="modal-container">
            <div onClick={closeModal} className="modal-background ">
            </div>
            
            <div className="bg-white rounded-lg px-4 py-3 z-10 center-items">
                <h3 className="mb-3 text-2xl">{title}</h3>
                <p className="mb-5">{subtitle}</p>
                <div className="flex gap-x-4 justify-end">
                    <button onClick={closeModal} className="py-2 px-6 border-2 rounded-md">Cancel</button>
                    <button onClick={deleteHandler} className="bg-red-500 text-white px-6 py-2 rounded-md">Proceed</button>
                </div>
            
            </div>
        </div>
    )
}

export default DeleteModal