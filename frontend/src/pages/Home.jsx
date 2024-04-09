import React, { useEffect } from 'react'
import routes from '../constants/routes';
import { useNavigate } from 'react-router-dom'

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
    <div>Home</div>
  )
}

export default Home