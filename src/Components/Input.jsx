import React , {useId}from 'react'

const Input = React.forwardRef(function input({
    label , 
    type = "text",
    className = '',
    ...props
},ref)
{
    const id = useId()
    return (
        <div>
            {label && <label className='w-full' htmlFor={id}>{label}</label>}
            <input 
                type={type} 
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
                id = {id}
            />
        </div>  
    )
})

export default Input