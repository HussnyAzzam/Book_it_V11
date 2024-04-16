import { useState, useEffect } from "react";
import { useInput } from "../hooks/useInput";
import { apiRequestHandler } from "../../apiReqHandler";
import { endPoints } from "../endpoint";

const PackageForm = ({ packageObj, closeModal, readOnly }) => {
    const packageName = useInput(packageObj?.name || "");
    const services = useInput(packageObj?.services || "");
    const expiryDate = useInput(packageObj?.expiredDate ? new Date(packageObj?.expiredDate).toISOString().slice(0, 10) : "");
    //const [packageIsActive, setPackageIsActive] = useState(packageObj?.isActive || false); // Old one
    const [packageIsActive, setPackageIsActive] = useState(packageObj?.active ? "true" : "false");
    useEffect(() => {
        setPackageIsActive(packageObj?.active ? "true" : "false");
    }, [packageObj]);

    const duration = useInput(packageObj?.duration || "");
    const price = useInput(packageObj?.price || "");

    const title = readOnly ? "View Package" : (packageObj && packageObj._id ? "Edit Package" : "Add New Package");
    
    const submitForm = async (e) => {
        e.preventDefault();
        const isActiveBoolean = packageIsActive === 'true'; // Convert to boolean
    
        const packageData = {
            name: packageName.value,
            services: services.value,
            active: isActiveBoolean, // Now a boolean
            expiredDate: expiryDate.value,
            duration: duration.value,
            price: price.value,
        };

        const url = packageObj && packageObj._id ? `${endPoints.package.UPDATE}/${packageObj._id}` : endPoints.package.CREATE;
        const method = packageObj && packageObj._id ? 'PUT' : 'POST';

        await apiRequestHandler(url, method, packageData);
        closeModal(); // Close the modal on successful submission
        window.location.reload(); // Reload the page to update the state
    };

    return (
        <div className="modal-container" onClick={closeModal}>
            <div className="modal-background" onClick={(e) => e.stopPropagation()}></div>
            <div className="form-container" onClick={(e) => e.stopPropagation()}>
                <form className="bg-white rounded-md px-6 py-3 overflow-y-auto h-full " onSubmit={submitForm}>
                    <button type="button" aria-label="Close" onClick={closeModal} className="close-btn">X</button>
                    <h3 className="text-2xl mb-4">{title}</h3>
                    <div className="grid gap-y-5 mt-8">
                        {/* Name field */}
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                            <input readOnly={readOnly} required className="input-field" type="text" id="name" {...packageName} />
                        </div>
                        {/* Services field */}
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="services">Services <span className="text-red-500">*</span></label>
                            <input readOnly={readOnly} required className="input-field" type="text" id="services" {...services} />
                        </div>
                        {/* Active field */}
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="active">Active <span className="text-red-500">*</span></label>
                            <select 
                                disabled={readOnly} // Disable the select dropdown if readOnly is true
                                readOnly={readOnly} 
                                required 
                                className="input-field"
                                value={packageIsActive} // Control the selected option with this value
                                onChange={(e) => setPackageIsActive(e.target.value)}
                                id="active"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        {/* Duration field */}
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="duration">Duration <span className="text-red-500">*</span></label>
                            <input readOnly={readOnly} required className="input-field" type="number" id="duration" {...duration} />
                        </div>
                        {/* Expiry Date field */}
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="expiryDate">Expiry Date <span className="text-red-500">*</span></label>
                            <input readOnly={readOnly} required className="input-field" type="date" id="expiryDate" {...expiryDate} />
                        </div>
                        {/* Price field */}
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="price">Price <span className="text-red-500">*</span></label>
                            <input readOnly={readOnly} required className="input-field" type="number" id="price" {...price} />
                        </div>
                        {/* Submit button */}
                        {!readOnly && (
                            <div className="flex justify-end">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-md" type="submit">
                                    {packageObj && packageObj._id ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PackageForm;