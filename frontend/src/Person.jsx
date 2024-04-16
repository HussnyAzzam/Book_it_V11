import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import DeleteModal from './components/DeleteModal';
import PersonForm from './forms/PersonForm';
import { apiRequestHandler } from '../apiReqHandler';
import { endPoints } from './endpoint';

const Person = () => {
    const { persons } = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPersons, setFilteredPersons] = useState(persons);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState({});
    const [isReadOnly, setIsReadOnly] = useState(false);

    const hideDeleteModal = () => setShowDeleteModal(false);
    const displayDeleteModal = (person) => {
        setSelectedPerson(person);
        setShowDeleteModal(true);
    };

    const [showFormModal, setShowFormModal] = useState(false);
    const editHandler = (person, readOnly) => {
        setIsReadOnly(readOnly);
        if(person) setSelectedPerson(person);
        setShowFormModal(true);
    };

    const addNewHandler = () => {
        setIsReadOnly(false);
        setSelectedPerson({});
        setShowFormModal(true);
    };

    const removePerson = async () => {
        await apiRequestHandler(endPoints.persons.DELETE + "/" + selectedPerson.id, 'DELETE');
        setShowFormModal(false);
    };

    const handleSearch = () => {
        const filtered = persons.filter(person =>
            person.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.lName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPersons(filtered);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleShowAll = () => {
        setFilteredPersons(persons); // Resetting to show all persons
        setSearchTerm(''); // Optionally clear the search term
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">Person</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Search persons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="px-4 py-2 border rounded search-input" // Ensures the input takes up 50% width
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">Search</button>
                <button onClick={handleShowAll} className="bg-gray-500 text-white px-4 py-2 ml-2 rounded">Show All</button>
            </div>
            <div className='flex flex-col gap-y-4 mt-10'>
                {filteredPersons.map(person => (
                    <div className='flex items-center gap-x-5' key={person.id}>
                        <p>{person?.fName}</p>
                        <p>{person?.lName}</p>
                        <button onClick={() => editHandler(person, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(person)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(person)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>

            {showDeleteModal && (
                <DeleteModal
                    title="Delete Person"
                    subtitle={`Are you sure you want to delete ${selectedPerson.fName} ${selectedPerson.lName}?`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removePerson}
                />
            )}
            {showFormModal && (
                <PersonForm 
                    person={selectedPerson}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}
        </div>
    );
};

export default Person;
