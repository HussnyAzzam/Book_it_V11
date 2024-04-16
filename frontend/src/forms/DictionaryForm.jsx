import { useState } from "react"
import { useInput } from "../hooks/useInput"
import { useNavigation } from 'react-router-dom'
import { apiRequestHandler } from "../../apiReqHandler"
import { endPoints } from "../endpoint"

const DictionaryForm = ({ dictionaryWord, closeModal, readOnly }) => {
    const word = useInput(dictionaryWord?.word || "")
    const hebrew = useInput(dictionaryWord?.hebrew)
    const arabic = useInput(dictionaryWord?.arabic)

    const title = readOnly ? "" : (dictionaryWord?.word ? "Edit Word" : "Add New Word")

    const navigate = useNavigation()

    const submitForm = async (e) => {
        const url = dictionaryWord?.word ? endPoints.dictionary.UPDATE + "/" + word.id : endPoints.dictionary.CREATE
        const method = dictionaryWord?.word ? 'PUT' : 'POST'
        e.preventDefault()
        const response = await apiRequestHandler(url, method, {
            word: word.value,
            hebrew: hebrew.value,
            arabic: arabic.value

        })

        console.log(response, 'response')
        if (response.word) navigate('/persons')
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
                        <label htmlFor="word">Word</label>
                        <input readOnly={readOnly} required className="" type="text" id="word" {...word} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="hebrew">Hebrew</label>
                        <input readOnly={readOnly} required className="" type="text" id="hebrew" {...hebrew} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="arabic">Arabic</label>
                        <input readOnly={readOnly} required className="" type="text" id="arabic" {...arabic} />
                    </div>

                </div>
                {!readOnly && (
                    <button className="bg-blue-600 mt-10 text-white px6 py-2 rounded-md w-full" type="submit">{dictionaryWord?.word ? 'Update' : 'Submit'}</button>
                )}
            </form>
        </div>
    )
}

export default DictionaryForm