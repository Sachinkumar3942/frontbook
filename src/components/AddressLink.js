import React from 'react'

const AddressLink = ({children}) => {
  return (
    <div>
        <a
        className=" my-3 block font-semibold underline"
        target="_blank" rel="noreferrer"
        href={"https://maps.google.com/?q=" + children}
      >
        {children}
      </a>
    </div>
  )
}

export default AddressLink