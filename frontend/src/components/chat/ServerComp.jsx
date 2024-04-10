import React from 'react'

function ServerComp({message='client', chat}) {
    return (
        <div className='server'>
            <div className='server-text text'>
                {/* server */}
                {chat?.message}
            </div>
        </div>
    )
}

export default ServerComp