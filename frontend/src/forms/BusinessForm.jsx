import { useRef, useState } from "react"
import { useInput } from "../hooks/useInput"
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const BusinessForm = ({ business, closeModal, readOnly }) => {
    const name = useInput("")
    const officialName = useInput("")
    const apiKey = useInput("")
    const categoryId = useInput("")
    const locationId = useInput("")
    const logoLink = useInput("")
    const taxId = useInput("")
    const coverImageLink = useInput("")
    const photosLinks = useInput("")
    const branches = useInput("")
    const street = useInput("")
    const [isActive, setIsActive] = useState(false)
    const poBox = useInput("")
    const description = useInput("")
    const number = useInput("")
    const city = useInput("")
    const postalCode = useInput("")
    const countBranches = useInput("")
    const country = useInput("")
    const email = useInput("")
    const waze = useInput("")
    const maps = useInput("")
    const web = useInput("")
    const firstName = useInput("")
    const lastName = useInput("")
    const countryCode = useInput("")
    const phone = useInput("")
    const mobile = useInput("")
    const referalBy = useInput("")

    const submitForm = async (e) => {
        e.preventDefault()
        const response = await apiRequestHandler.apply(endPoints.business.CREATE, "POST", {
            taxId: taxId.value,
            officialName: officialName.value,
            name: name.value,
            description: description.value,
            categoryId: categoryId.value,
            locationId: locationId.value,
            apiKey: apiKey.value,
            logoLink: logoLink.value,
            coverImageLink: coverImageLink.value,
            photosLinks: photosLinks.value,
            branches: branches.value,
            countBranches: countBranches.value,
            active: isActive,
            address: {
                street: street.value,
                city: city.value,
                postalCode: postalCode.value,
                country: country.value
            },
            phone: {
                countryCode: countryCode.value,
                number: phone.value
            },
            mobile: {
                countryCode: countryCode.value,
                number: mobile.value
            },
            whatsapp: `wa.me/${countryCode}${number}`,
            waze: waze.value,
            maps: maps.value,
            email: email.value,
            web: web.value,
            owner: {
                fName: firstName.value,
                lName: lastName.value,
                phone: {
                    countryCode: countryCode.value,
                    number: phone.value
                },
                mobile: {
                    countryCode: countryCode.value,
                    number: mobile.value
                }
            },
            contact: {
                fName: firstName.value,
                lName: lastName.value,
                phone: {
                    countryCode: countryCode.value,
                    number: phone.value
                },
                mobile: {
                    countryCode: countryCode.value,
                    number: mobile.value
                }                
            },
            referalBy: referalBy.value
        })
    }
    return (
        <div className="modal-container">
            <div onClick={closeModal} className="modal-background">
            </div>
            <form className="bg-white rounded-md px-6 py-3 w-2/3 pb-10 overflow-y-auto h-full" onSubmit={submitForm}>
                <div className="grid grid-cols-2 gap-y-5 mt-8">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Name</label>
                        <input className="" type="text" id="name" {...name} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="officialName">Official Name</label>
                        <input className="" type="text" id="officialName" {...officialName} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="apiKey">Api Key</label>
                        <input className="" type="text" id="apiKey" {...apiKey} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="categoryId">Category Id</label>
                        <input className="" type="text" id="categoryId" {...categoryId} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="locationId">Location Id</label>
                        <input className="" type="text" id="locationId" {...locationId} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="logoLink">Logo Link</label>
                        <input className="" type="text" id="logoLink" {...logoLink} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="coverImageLink">Cover Image Link</label>
                        <input className="" type="text" id="coverImageLink" {...coverImageLink} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="locationId">Photos Links</label>
                        <input className="" type="text" id="locationId" {...photosLinks} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Branches</label>
                        <input className="" type="text" id="name" {...branches} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="street">Street</label>
                        <input className="" type="text" id="street" {...street} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="pobox">P.O.Box</label>
                        <input className="" type="text" id="pobox" {...poBox} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="city">City</label>
                        <input className="" type="text" id="city" {...city} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input className="" type="text" id="postalCode" {...postalCode} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="country">Country</label>
                        <input className="" type="text" id="country" {...country} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="waze">Waze</label>
                        <input className="" type="text" id="waze" {...waze} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="maps">Maps</label>
                        <input className="" type="text" id="maps" {...maps} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email">Email</label>
                        <input className="" type="text" id="email" {...email} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="web">Web</label>
                        <input className="" type="text" id="web" {...web} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="firstName">First Name</label>
                        <input className="" type="text" id="firstName" {...firstName} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="lastName">Last Name</label>
                        <input className="" type="text" id="lastName" {...lastName} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="countryCode">Country code</label>
                        <input className="" type="text" id="countryCode" {...countryCode} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="phone">Phone</label>
                        <input className="" type="text" id="phone" {...phone} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="mobile">Mobile</label>
                        <input className="" type="text" id="mobile" {...mobile} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="referalBy">Referal By</label>
                        <input className="" type="text" id="referalBy" {...referalBy} />
                    </div>
                </div>
                {!readOnly && (
                    <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{business?.fName ? 'Update' : 'Submit'}</button>
                )}
            </form>
        </div>
    )
}

export default BusinessForm