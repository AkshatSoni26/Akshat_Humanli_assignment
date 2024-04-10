import React from 'react'

function ClientComp({message='client'}) {
    return (
        <div className='client'>
            <div className='client-text text'>
                {message}
            </div>
        </div>
    )
}

export default ClientComp