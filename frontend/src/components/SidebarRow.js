import React from 'react'
import './SidebarRow.css'
import {Avatar} from "@material-ui/core"

function SidebarRow( { src, Icon, title} ) {
    return (
        <div className="sidebarRow">
            {/* if there's a src, pass in the src prop */}
        
            {src && <Avatar src={src}  />} 
            
            {/* if an icon is passed, passing component as a prop (capitalised icon)*/}

            {Icon && <Icon style={{ fontSize: '24px', color: '#b0b0b0' }}/>}

            <div className='poppins_font'>{title}</div>
        </div>
    )
}

export default SidebarRow
