import React from 'react'
import ClientComp from './ClientComp.jsx'
import ServerComp from './ServerComp.jsx'

function Chat() {
    return (
        <div className='position-relative w-100 h-100 '>

            <div className='chat-contanier overflow-auto w-100 d-flex flex-column p-2' style={{ height: '80vh', position: 'absolute' }}>
                <ClientComp />

                <ServerComp />

                <ClientComp />
            </div>

        </div>
    )
}

export default Chat