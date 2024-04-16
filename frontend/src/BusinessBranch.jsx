import { useLoaderData } from 'react-router-dom'
const BusinessBranch = () => {
    const { businessBranches } = useLoaderData()

    return (
        <div>
            <h3 className="text-3xl">Business Branch</h3>
            <div className='flex flex-col gap-y-4 mt-10'>
                {businessBranches.map(branch => (
                    <div className='flex items-center gap-x-5' key={branch.id}>
                        <p>{branch?.name}</p>
                        <button className='ml-auto mr-10 px-6 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                        <button className='px-6 py-2 rounded-md bg-red-600 text-white'>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BusinessBranch