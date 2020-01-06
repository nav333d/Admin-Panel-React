import React from 'react';

import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

const AdminNav = () =>{
    
    const links = [
        {
            title : 'Sellers  ',
            linkTo : '/sellers'
        },
        {
            title : 'Buyers  ',
            linkTo : '/buyers'
        },
        {
            title :'Riders  ',
            linkTo : '/riders'
        },
       
        {
            title : 'Log out  ',
            linkTo : '/sign_in'
        },
        
    ]
    const style={
        color : '#ffffff',
        fontWeight : '300',
        borderBottom : '1px solid #fff',
        fontWeight: 'bold',
    }

   const renderItems = () =>(
       links.map(link =>(
           <Link to={link.linkTo} key={link.title}>
                <ListItem  button style={style}>
                    {link.title}
                </ListItem>
           </Link>
       ))

    )

        
        return(
            <div>
                
                {renderItems()}
            </div>
        )
    

}

export default AdminNav;