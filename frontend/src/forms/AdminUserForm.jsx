import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const AdminUserForm = ({ adminUser, closeModal, readOnly }) => {
    const fName = useInput(adminUser?.contact?.fName || "")
    const lName = useInput(adminUser?.contact?.lName || "")
    const countryCode = useInput(adminUser?.mobile?.countryCode || "")
    const mobile = useInput(adminUser?.mobile?.number || "")
    const email = useInput(adminUser?.email || "")
    const password = useInput("")
    const [activated, setActivated] = useState(adminUser?.activated || false)

    const title = readOnly ? "" : (adminUser?.contact?.fName ? "Edit adminUser" : "Add New adminUser")
    const submitForm = async (e) => {
        e.preventDefault()
        const url = adminUser?.fName ? endPoints.adminUser.UPDATE + "/" + adminUser?._id : endPoints.adminUser.CREATE
        const method = adminUser?.fName ? 'PUT' : 'POST'
        const response = await apiRequestHandler(url, method, {
            fName: fName.value,
            lName: lName.value,
            mobile: {
                number: mobile.value,
                countryCode: countryCode.value
            },
            email: email.value,
            password: password.value,
            activated: activated.value
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
                        <label htmlFor="name">First Name</label>
                        <input readOnly={readOnly} required className="" type="text" id="name" {...fName} />
                    </div>
                </div>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Last Name</label>
                        <input readOnly={readOnly} required className="" type="text" id="name" {...lName} />
                    </div>
                </div>
                {!readOnly && !adminUser?.fName &&
                    <div className="grid gap-y-5 mt-8">
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="name">Password</label>
                            <input readOnly={readOnly} required className="" type="password" id="name" {...password} />
                        </div>
                    </div>
                }
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Country Code</label>
                        <input readOnly={readOnly} required className="" type="text" id="name" {...countryCode} />
                    </div>
                </div>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Mobile</label>
                        <input readOnly={readOnly} required className="" type="text" id="name" {...mobile} />
                    </div>
                </div>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Email</label>
                        <input readOnly={readOnly} required className="" type="text" id="name" {...email} />
                    </div>
                </div>
                <div className="grid gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Active</label>
                        <select value={activated} onChange={e => setActivated(e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                </div>
                {!readOnly && (
                    <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{adminUser?.fName ? 'Update' : 'Submit'}</button>
                )}
            </form>
        </div>
    )
}

export default AdminUserForm