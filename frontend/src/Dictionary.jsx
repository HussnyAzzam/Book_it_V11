import { useLoaderData } from 'react-router-dom'
import { apiRequestHandler } from '../apiReqHandler'
import { endPoints } from './endpoint'
import { useState } from 'react'
import DeleteModal from './components/DeleteModal'
import DictionaryForm from './forms/DictionaryForm'
const Dictionary = () => {
    const { dictionaries } = useLoaderData()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedWord, setSelectedWord] = useState({})
    const [isReadOnly, setIsReadOnly] = useState(false)
    const hideDeleteModal = () => setShowDeleteModal(false)
    const displayDeleteModal = (person) => {
        setSelectedWord(person)
        setShowDeleteModal(true)
    }

    const [showFormModal, setShowFormModal] = useState(false)
    const editHandler = (person, readOnly) => {
        console.log('this', readOnly)
        setIsReadOnly(readOnly)
        if (person) setSelectedWord(person)
        setShowFormModal(true)
    }
    const addNewHandler = () => {
        setSelectedWord({})
        setShowFormModal(true)
    }
    const removePerson = async () => {
        const response = await apiRequestHandler(endPoints.persons.DELETE + "/" + selectedWord.id, 'DELETE')
        setShowFormModal(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl">Dictionary</h3>
                <button onClick={addNewHandler} className='bg-blue-600 text-white px-6 py-3 rounded-md'>Add New</button>
            </div>
            <div className='flex flex-col gap-y-4 mt-10'>
                {dictionaries.map(word => (
                    <div className='flex items-center gap-x-5' key={word.id}>
                        <p>{word?.word}</p>
                        <p>{word?.arabic}</p>
                        <p>{word?.hebrew}</p>
                        <button onClick={() => editHandler(word, true)} className='ml-auto mr-10 px-6 py-2 rounded-md bg-blue-600 text-white'>View</button>
                        <button onClick={() => editHandler(word)} className='mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button onClick={() => displayDeleteModal(word)} className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>
            {showDeleteModal && (
                <DeleteModal
                    title="Delete Person"
                    subtitle={`Are you sure you want to delete ${selectedWord.fName} ${selectedWord.lName}`}
                    closeModal={hideDeleteModal}
                    deleteHandler={removePerson}
                />
            )}
            {showFormModal && (
                <DictionaryForm
                    dictionaryWord={selectedWord}
                    closeModal={() => setShowFormModal(false)}
                    readOnly={isReadOnly}
                />
            )}
        </div>
    )
}

export default Dictionary