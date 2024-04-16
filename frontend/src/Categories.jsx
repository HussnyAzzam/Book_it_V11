import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import DeleteModal from './components/DeleteModal';
import CategoryForm from './forms/CategoryForm';
import { apiRequestHandler } from '../apiReqHandler';
import { endPoints } from './endpoint';

const Categories = () => {
    const { categories } = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories || []);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    const handleSearch = () => {
        const filtered = categories.filter(category => 
            category.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredCategories(filtered);
    };

    const handleShowAll = () => {
        setFilteredCategories(categories);
        setSearchTerm('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const displayDeleteModal = (category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const hideDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const removeCategory = async () => {
        try {
            await apiRequestHandler(`${endPoints.categories.DELETE}/${selectedCategory._id}`, 'DELETE');
            toast.success('Category deleted successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Delay for toast visibility
        } catch (error) {
            toast.error('Failed to delete category.');
        }
    };

    const editHandler = (category, readOnly) => {
        setIsReadOnly(readOnly);
        setSelectedCategory(category);
        setShowFormModal(true);
    };

    const addNewHandler = () => {
        setIsReadOnly(false);
        setSelectedCategory({});
        setShowFormModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">External Customers</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="px-4 py-2 border rounded search-input"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">Search</button>
                <button onClick={handleShowAll} className="bg-gray-500 text-white px-4 py-2 ml-2 rounded">Show All</button>
            </div>
            <div className='flex flex-col gap-y-4 mt-10'>
                {filteredCategories.map(category => (
                    <div className='flex items-center gap-x-5' key={category.id}>
                        <p>{category.name}</p>
                        <button onClick={() => editHandler(category, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(category, false)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(category)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>

            {showDeleteModal && (
                <DeleteModal
                    title="Delete Category"
                    subtitle={`Are you sure you want to delete ${selectedCategory?.name}?`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removeCategory}
                />
            )}
            {showFormModal && (
                <CategoryForm
                    category={selectedCategory}
                    closeModal={() => { setShowFormModal(false); window.location.reload(); }} // Ensure reload on modal close
                    readOnly={isReadOnly}
                />
            )}
        </div>
    );
};

export default Categories;