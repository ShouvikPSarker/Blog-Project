import React from 'react'

function Button({
    btntext , 
    textColor = 'text-white',
    className = '',
    bgColor = 'bg-blue-600',
    type = 'button',
    ...props
}) {
  return (
    <button className={`px-2 py-4 rounded-lg ${textColor} ${className} ${bgColor}`}{...props}>
        {btntext}
    </button>
  )
}

export default Button