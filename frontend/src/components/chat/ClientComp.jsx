import React from 'react'

function ClientComp({message='client', chat}) {

    console.log('chat ===>', chat)

    return (
        <div className='client' >
            <div className='client-text text'>
                {/* {chat?.message} */}
            {chat?.message}
            </div>
        </div>
    )
}

export default ClientComp