import React from 'react'
import ChatText from './ChatText'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar />
            <Search />
            <ChatText />
        </div>
    )
}

export default Sidebar
