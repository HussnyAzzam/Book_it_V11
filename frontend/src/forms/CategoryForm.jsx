import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'; // Make sure react-toastify is installed and set up
import { apiRequestHandler } from "../../apiReqHandler";
import { endPoints } from "../endpoint";

const CategoryForm = ({ category, closeModal, readOnly }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        setName(category?.name || "");
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (readOnly) {
            console.log("Read-only mode, no submission allowed.");
            return;
        }

        const url = category && category._id ? `${endPoints.categories.UPDATE}/${category._id}` : endPoints.categories.CREATE;
        const method = category && category._id ? 'PUT' : 'POST';
        const payload = { name };

        try {
            await apiRequestHandler(url, method, payload);
            toast.success('Category saved successfully!'); // Display success toast
            setTimeout(() => {
                closeModal();
                window.location.reload(); // Reload the page after showing the toast
            }, 2000); // Delay for toast visibility
        } catch (error) {
            toast.error('Failed to save category.'); // Display error toast
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="relative bg-white rounded-md px-6 py-3 overflow-y-auto h-full">
                    <button type="button" aria-label="Close" onClick={closeModal} className="close-btn">X</button>
                    <h3 className="text-2xl mb-4">{readOnly ? "View Category" : (category?.name ? "Edit Category" : "Add New Category")}</h3>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Name<span className="text-red-500">*</span></label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly={readOnly} required className="input-field"/>
                    </div>
                    {!readOnly && (
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="submit-btn bg-blue-600 text-white px-6 py-2 rounded-md">Save</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;
