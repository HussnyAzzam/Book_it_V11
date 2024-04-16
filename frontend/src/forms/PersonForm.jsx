import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { useNavigation } from 'react-router-dom'
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const PersonForm = ({ person, closeModal, readOnly }) => {
    const fName = useInput(person?.fName || "")
    const lName = useInput(person?.lName || "")
    const countryCode = useInput(person?.mobile?.countryCode || "")
    const phone = useInput(person?.phone?.number || "")
    const mobile = useInput(person?.mobile?.number || "")
    const businessId = useInput(person?.businessId || "")
    const [type, setType] = useState(person.type || "Contact")
    const navigate = useNavigation()

    const title = readOnly ? "" : (person?.fName ? "Edit Person" : "Add New Person")
    const submitForm = async (e) => {
        const url = person.fName ? endPoints.persons.UPDATE + "/" + person.id : endPoints.persons.CREATE
        const method = person.fName ? 'PUT' : 'POST'
        e.preventDefault()
        const response  = await apiRequestHandler(url, method, {
            fName: fName.value, 
            lName: lName.value, 
            businessId: businessId.value, 
            type, 
            mobile: {
                number: mobile.value,
                countryCode: countryCode.value
            }, 
            phone: {
                number: phone.value,
                countryCode: countryCode.value
            },
        })

        console.log(response, 'response')
        if(response.person) navigate('/persons')
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
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="lastName">Last Name</label>
                        <input readOnly={readOnly}  required className="" type="text" id="lastName" {...lName} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="countryCode">Country Code</label>
                        <input readOnly={readOnly} required className="" type="text" id="countryCode" {...countryCode} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="phone">Phone</label>
                        <input readOnly={readOnly} required className="" type="text" id="phone" {...phone} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="mobile">Mobile</label>
                        <input readOnly={readOnly} required className="" type="text" id="mobile" {...mobile} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="businessId">Business Id</label>
                        <input readOnly={readOnly} required className="" type="text" id="businessId" {...businessId} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="type">Type</label>
                        <select id="type" onChange={e => setType(e.target.value)} value={type}>
                            <option value="Contact">Contact</option>
                            <option value="Owner">Owner</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>

                </div>
                <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{person.fName ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    )
}

export default PersonForm