import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import MessageContainer from '../components/MessageContainer'
import Sidebar from '../components/Sidebar'
// import Sidebar from './Sidebar'

const Chat = () => {
  // const { authUser } = useSelector(store => store.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!authUser) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer />
    </div>
  )
}

export default Chat