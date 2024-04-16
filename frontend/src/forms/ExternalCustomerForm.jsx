import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { useNavigation } from 'react-router-dom'
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const ExternalCustomerForm = ({ customer, closeModal, readOnly }) => {
    const fName = useInput(customer?.fName || "")
    const lName = useInput(customer?.lName || "")
    const city = useInput(customer?.city || "")
    const email = useInput(customer?.email || "")
    const countryCode = useInput(customer?.mobile?.countryCode || "")
    const mobile = useInput(customer?.mobile?.number || "")
    const businessId = useInput(customer?.business_id || "")
    const navigate = useNavigation()

    const title = readOnly ? "" : (customer?.fName ? "Edit External Customer" : "Add New External Customer")
    const submitForm = async (e) => {
        const url = customer.fName ? endPoints.externalCustomers.UPDATE + "/" + customer._id : endPoints.externalCustomers.CREATE
        const method = customer.fName ? 'PUT' : 'POST'
        e.preventDefault()
        const response  = await apiRequestHandler(url, method, {
            fName: fName.value, 
            lName: lName.value, 
            business_id: businessId.value, 
            email: email.value,
            mobile: {
                number: mobile.value,
                countryCode: countryCode.value
            },
            city: city.value,
        })

        console.log(response, 'response')
        if(response.customer) navigate('/external-customers')
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
                        <label htmlFor="email">Email</label>
                        <input readOnly={readOnly}  required className="" type="email" id="email" {...email} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="city">City</label>
                        <input readOnly={readOnly}  required className="" type="text" id="city" {...city} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="countryCode">Country Code</label>
                        <input readOnly={readOnly} required className="" type="text" id="countryCode" {...countryCode} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="mobile">Mobile</label>
                        <input readOnly={readOnly} required className="" type="text" id="mobile" {...mobile} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="businessId">Business Id</label>
                        <input readOnly={readOnly} required className="" type="text" id="businessId" {...businessId} />
                    </div>

                </div>
                <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{customer.fName ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    )
}

export default ExternalCustomerForm