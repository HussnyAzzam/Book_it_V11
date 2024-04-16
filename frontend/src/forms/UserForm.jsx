import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const UserForm = ({ user, closeModal, readOnly }) => {
    const fName = useInput(user?.fName || "")
    const lName = useInput(user?.lName || "")
    const countryCode = useInput(user?.mobile?.countryCode || "")
    const mobile = useInput(user?.mobile?.number || "")
    const email = useInput(user?.email || "")
    const password = useInput("")
    const city = useInput(user?.city || "")
    const [activated, setActivated] = useState(user?.activated || false)

    const title = readOnly ? "" : (user?.fName ? "Edit User" : "Add New User")
    const submitForm = async (e) => {
        e.preventDefault()
        const url = user?.fName ? endPoints.user.UPDATE + "/" + user?._id : endPoints.user.CREATE
        const method = user?.fName ? 'PUT' : 'POST'
        const response = await apiRequestHandler(url, method, {
            fName: fName.value,
            lName: lName.value,
            mobile: {
                number: mobile.value,
                countryCode: countryCode.value
            },
            email: email.value,
            city: city.value,
            password: password.value,
            activated: activated.value
        })

        console.log(response, 'response')
    }
    
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
                {!readOnly && !user?.fName &&
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
                        <label htmlFor="name">City</label>
                        <input readOnly={readOnly} required className="" type="text" id="name" {...city} />
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
                    <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{user?.fName ? 'Update' : 'Submit'}</button>
                )}
            </form>
        </div>
    )
}

export default UserForm