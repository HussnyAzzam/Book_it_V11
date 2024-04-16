import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const ServiceForm = ({ serviceObj, closeModal, readOnly }) => {
    const name = useInput(serviceObj?.name || "")
    const description = useInput(serviceObj?.description || "")
    const [active, setActive ] = useState(serviceObj?.active || true)

    const title = readOnly ? "" : (serviceObj?.name ? "Edit Package" : "Add New Package")
    const submitForm = async (e) => {
        e.preventDefault()
        const url = serviceObj?.name ? endPoints.services.UPDATE + "/" + serviceObj?._id : endPoints.services.CREATE
        const method = serviceObj?.name ? 'PUT' : 'POST'
        const response = await apiRequestHandler(url, method, {
            name: name.value,
            description: description.value,
            active: active
        })

    }

    console.log('readOnly', readOnly)
    return (
        <div className="modal-container">
            <div onClick={closeModal} className="modal-background">
            </div>
            <form className="bg-white rounded-md px-6 py-3 w-1/2 pb-10 overflow-y-auto h-full" onSubmit={submitForm}>
                <h3 className="text-2xl">{title}</h3>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Name</label>
                    <input readOnly={readOnly} required className="" type="text" id="name" {...name} />
                    </div>
                </div>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Services</label>
                        <textarea name="" id="" cols="30" rows="10" {...description}></textarea>
                    </div>
                </div>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Active</label>
                        <select value={active} onChange={e => setActive(e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                </div>
                {!readOnly && (
                    <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{serviceObj?.active ? 'Update' : 'Submit'}</button>
                )}
            </form>
        </div>
    )
}

export default ServiceForm