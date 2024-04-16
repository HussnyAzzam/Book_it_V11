import { useState } from "react"

export const useInput = (initial) => {
    const [inputState, setInputState] = useState(initial)
    const value = inputState
    const onChange = (e) => setInputState(e.target.value)

    return {
        value,
        onChange
    }
}