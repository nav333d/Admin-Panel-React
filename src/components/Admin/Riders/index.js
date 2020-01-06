import React, { Component } from 'react';


import AdminLayout from '../../../Hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {firebaseUsers} from '../../../firebase';



class Rider extends Component{

    state ={
        isLoading : true,
        users : [],
        docids :[],
        totalRiders : 0
    }
    
    componentDidMount(){
        const arr =[]
        const docs =[]
        let count = 0
        firebaseUsers.get().then((snapshot) =>{
            snapshot.docs.forEach(doc =>{
               
                if(doc.data().type === 'rider' && doc.data().Status === 'Active' ){
                    let firebaseData = doc.data();
                    arr.push(firebaseData)
                    docs.push(doc.id)
                    count = count +1
                    
                }
                this.setState({
                    isLoading : false,
                    users : arr,
                    docids : docs,
                    totalRiders : count
                })                
            })
        })
    }

    deleteRider= (id) => {
        console.log(id);
        firebaseUsers.doc(id).update({
             Status : 'DeActive'
         })
         const arr =[]
         const docs =[]
         firebaseUsers.get().then((snapshot) =>{
             snapshot.docs.forEach(doc =>{
                
                 if(doc.data().type === 'rider' && doc.data().Status === 'Active' ){
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
      return(
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell>First Name</TableCell>
                                    <TableCell> Last Name</TableCell>
                                    <TableCell> Email ID </TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell> Action </TableCell>
                                    

                                </TableRow>
                             </TableHead>

                             <TableBody>
                                 {
                                     this.state.users ?
                                        this.state.users.map((user,i)=>(
                                            <TableRow key={i} >
                                                <TableCell>
                                                    {user.firstName}
                                                </TableCell>
                                                <TableCell>
                                                    {user.lastName}
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>

                                                <TableCell>
                                                    {user.Status}
                                                </TableCell>
                                                
                                                <TableCell>
                                                    {
                                                    <button onClick={() =>this.deleteRider(this.state.docids[i])}>Delete Account</button>
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
                                 Total Riders are {this.state.totalBuyers}
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

export default Rider;