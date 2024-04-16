import { toast } from 'react-toastify'
export const apiRequestHandler = async (url, method, data) => {
    url = import.meta.env.VITE_BACKEND_URL + url;
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if(response.status === 200 || response.status === 201){
            toast.success(responseData.message || 'success', {
                autoClose: 1000
                
            })
            console.log('tthis')
        } else {
            console.log('that')
            toast.error(responseData.message || 'request failed', {
                autoClose: 1000
            })
        }
        console.log('got here')
        return responseData;
    } catch (error) {
        toast.error(responseData?.message || 'Request failed')

    }
};
