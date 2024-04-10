import React, { useEffect } from 'react'
import routes from '../constants/routes';
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/Navbar/NavBar.jsx';
import Chat from '../components/chat/Chat.jsx';
import Message from '../components/Message/Message.jsx';

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // setLoading(true);
    const user = localStorage.getItem("@user");
    if (!user) {
      navigate(routes.login);
    }
  }, []
  )
  return (
    <>
      <NavBar />
      <div id='chat' className='container w-100'>

        <Chat />

        <Message />

      </div>
    </>
  )
}

export default Home