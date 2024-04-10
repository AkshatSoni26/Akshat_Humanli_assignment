import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import axiosClient from '../../utiles/axiosclient';
import { backed_urls } from '../../constants/routes';


function Message() {

    const [message, setMessage] = useState('')


    const handleMessage = (event) => {
        const user_id = localStorage.getItem('@user')
        if (event.key === "Enter"){
            console.log('meesssage ==>', message)
            axiosClient.post(
                backed_urls.createChat, {
                    'message': message,
                    'id':user_id
                }
            ).then(
                (res) =>{
                    console.log('res ===>', res)
                }
            ).catch(
                (err) => {
                    console.log("err ===>", err)
                }
            )
            setMessage('')
        }
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%)',
            height: "10vh"
        }} className='container-sm d-flex w-100 align-items-center'>

            <input type="text" class="form-control w-100 m-2 p-3" style={{
                height: '40px',
                borderRadius: '20px'
            }}
                placeholder='type your message here...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleMessage}
            />

            <IoIosSend style={{ cursor: 'pointer' }} size={40} className='send-message' onClick={handleMessage} />
            {/* <button className='m-2 w-25'>send</button> */}

        </div>
    )
}

export default Message