import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import PackageForm from './forms/PackageForm';
import DeleteModal from './components/DeleteModal';
import { apiRequestHandler } from '../apiReqHandler';
import { endPoints } from './endpoint';

const Package = () => {
    const { packages } = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPackages, setFilteredPackages] = useState(packages || []);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState({});
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    const hideDeleteModal = () => setShowDeleteModal(false);
    const displayDeleteModal = (pkg) => {
        setSelectedPackage(pkg);
        setShowDeleteModal(true);
        
    };

    // Handler for viewing a package
const viewHandler = (pkg) => {
    setIsReadOnly(true); // Ensure the form is in read-only mode
    setSelectedPackage(pkg); // Set the selected package to view
    setShowFormModal(true); // Show the form modal
};

// Handler for editing a package
const editHandler = (pkg) => {
    setIsReadOnly(false); // Allow editing in the form
    setSelectedPackage(pkg); // Set the selected package to edit
    setShowFormModal(true); // Show the form modal
};

    const addNewHandler = () => {
        setSelectedPackage({});
        setIsReadOnly(false);
        setShowFormModal(true);
        
    };

    const removePackage = async () => {
        await apiRequestHandler(endPoints.package.DELETE + "/" + selectedPackage._id, 'DELETE');
        // Refresh or update state as necessary
        //window.location.reload(); // Reloading the page to update the state
        setShowDeleteModal(false);// hide delete modal windows
        window.location.reload(); // Reloading the page to update the state
    };

    const handleSearch = () => {
        const filtered = packages.filter(pkg =>
            pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPackages(filtered);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleShowAll = () => {
        setFilteredPackages(packages); // Resetting to show all packages
        setSearchTerm(''); // Optionally clear the search term
    };

    return (
        <div>
            <div className="header">
                <h3 className="text-3xl">Packages</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>
            <div className="search-form mt-4">
                <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="search-input  input-field" // Adjusted class name for consistency
                />
                <button onClick={handleSearch} className="search-button">Search</button>
                <button onClick={handleShowAll} className="show-all-button">Show All</button>
                <button onClick={() => window.location.reload()} className="refresh-button">Refresh</button>
            </div>
            <div className='flex flex-col gap-y-4 mt-10 '>
                {filteredPackages.map(pkg => (
                    <div className='flex items-center gap-x-5' key={pkg.id}>
                    <p>{pkg.name}</p>
                    <button onClick={() => viewHandler(pkg)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                    <button onClick={() => editHandler(pkg)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                    <button onClick={() => displayDeleteModal(pkg)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                </div>
                ))}
            </div>

            {showDeleteModal && (
                  
                <DeleteModal
            
                    title="Delete Package"
                    subtitle={`Are you sure you want to delete ${selectedPackage?.name}?`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removePackage }
                    
                /> 
                
            )}
            {showFormModal && (
                <PackageForm
                    packageObj={selectedPackage}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                    
                />
            )}
        </div>
    );
};

export default Package;