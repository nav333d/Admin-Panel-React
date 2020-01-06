import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';




class Header extends Component{
    render(){
        return(
            <AppBar
             position = "fixed"
             style = {{
                 backgroundColor :'#FF0055',
                 boxShadow : 'none',
                 padding : '15px 0px',
                 borderBottom : '2px solid #fff'
             }}
            >
            
                <Toolbar styles={{display :'flex'}}>
                
                    <div styles={{flexGrow : 1}}>
                        <div className="header_logo">
                            <img src={require('./logo.png')} style={{ width: 60, color: '#fff' }} />
                            <h2 style={{ fontWeight: 'bold' }}> Home - E - Food </h2>
                        </div>
                    </div>
                    
                
                </Toolbar>

            </AppBar>
        )
    }
}

export default Header;