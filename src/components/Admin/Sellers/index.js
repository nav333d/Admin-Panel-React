import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AdminLayout from '../../../Hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

import {firebaseUsers} from '../../../firebase';





class Sellers extends Component{

    state ={
        isLoading : true,
        users : [],
        docids :[],
        totalSeller : 0,
        
    }
    componentDidMount(){
        const arr =[]
        const docs =[]
        let count = 0
        firebaseUsers.get().then((snapshot) =>{
            snapshot.docs.forEach(doc =>{
               
                if(doc.data().type === 'Seller' && doc.data().Status === 'Active' ){
                    let firebaseData = doc.data();
                    arr.push(firebaseData)
                    docs.push(doc.id)
                    count = count +1;
                    

               }
                this.setState({
                    isLoading : false,
                    users : arr,
                    docids : docs,
                    totalSeller : count
                })                
            })
        })
    }
    
    showPosts = (id) =>{
        console.log(id);
        alert(id);

     }
    deleteSeller = (id) => {
       firebaseUsers.doc(id).update({
            Status : 'DeActive'
        })
        const arr =[]
        const docs =[]
        firebaseUsers.get().then((snapshot) =>{
            snapshot.docs.forEach(doc =>{
               
                if(doc.data().type === 'Seller' && doc.data().Status === 'Active' ){
                    let firebaseData = doc.data();
                    arr.push(firebaseData)
                    docs.push(doc.id)
                    
                }
                this.setState({
                    isLoading : false,
                    users : arr,
                    docids : docs
                })                
            })
        })
     }
    render(){
        console.log(this.state.totalSeller);
        return(
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> First Name</TableCell>
                                    <TableCell> Last Name</TableCell>
                                    <TableCell> Email ID </TableCell>
                                    <TableCell>Joining Date</TableCell>
                                    <TableCell>View</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                             </TableHead>

                             <TableBody>
                                 {
                                     this.state.users ?
                                        this.state.users.map((user,i)=>(
                                            <TableRow key={i} >
                                                <TableCell>
                                                    {user.firstName }
                                                </TableCell>
                                                <TableCell>
                                                    {user.lastName }
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    12-04-2018
                                                </TableCell>
                                                <TableCell>
                                                   <Link to={`/seePosts/editPost/${this.state.docids[i]}`}>
                                                        <strong>See Posts</strong>
                                                   </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                    <button onClick={() =>this.deleteSeller(this.state.docids[i])}>Delete Seller</button>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))

                                     :null
                                 }
                             
                            </TableBody>
                        </Table>
                   </Paper>    
                   
                    
                   <div className="usercount">
                             Total Active Users are{ this.state.totalSeller}
                   </div>
                   


                     <div className="admin_progress">
                        {
                            this.state.isLoading ?
                            <CircularProgress thickness={6} style={{color : '#98c5e9'}}/>

                             : ''
                        }
                     </div>
                </div>        
            </AdminLayout>
            
        )
    }
}

export default Sellers;