import React,{ Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebaseUsers } from '../../../firebase';

import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";


import { Link } from 'react-router-dom';




class SeePosts extends Component{

    constructor(props){
        super(props);
    this.state ={
        userId : '',
        docs : [],
        postids : [],
        sellerId : '',
        startDate : new Date(),
        mydate : '',
        nothing : ''
    }
    //this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
}

    componentDidMount(){
        const ID = this.props.match.params.id
        const arr = []
        const ids = []
      firebaseUsers.doc(ID).collection('posts').get().then((snapshot) => {
          snapshot.forEach(doc =>{
              ids.push(doc.id)
             
              arr.push({
                  description : doc.data().details,
                  dish_title : doc.data().title,
                  price : doc.data().price,
                  rating : doc.data().rating,
                  image: doc.data().image,
                 
              })

          })
          this.setState({
              docs : arr,
              postids : ids,
              sellerId : ID
          })
         
     })       
}
handleSelect(date) {
    

    let str = date.toString();
    let dates = str.split(' ')
    let correctFormat = '';

    if(dates[1] === "Jan"){
         correctFormat = '01/'+dates[2] +'/'+ dates[3]
      
    }
    else if(dates[1] === "Feb"){
         correctFormat = '02/'+dates[2] +'/'+ dates[3]
       
    }
     else if(dates[1] === "Mar"){
        correctFormat = '03/'+dates[2] +'/'+ dates[3]
      
    }
     else if(dates[1] === "Apr"){
         correctFormat = '04/'+dates[2] +'/'+ dates[3]
        
    }else if(dates[1] === "May"){
         correctFormat = '05/'+dates[2] +'/'+ dates[3]
        
    }
    else if(dates[1] === "Jun"){
         correctFormat = '06/'+dates[2] +'/'+ dates[3]
     
    }
    else if(dates[1] === "Jul"){
         correctFormat = '07/'+dates[2] +'/'+ dates[3]
     
    }
    else if(dates[1] === "Aug"){
         correctFormat = '08/'+dates[2] +'/'+ dates[3]
      
    }
    else if(dates[1] === "Sep"){
        correctFormat = '09/'+dates[2] +'/'+ dates[3]
      
    }
    else if(dates[1] === "Oct"){
        correctFormat = '10/'+dates[2] +'/'+ dates[3]
       
    }
    else if(dates[1] === "Nov"){
         correctFormat = '11/'+dates[2] +'/'+ dates[3]
      
    }
    else{
         correctFormat = '12/'+dates[2] +'/'+ dates[3]
       

    }
   
    
   const arr = []
   const ids = []
      firebaseUsers.doc(this.state.sellerId).collection('posts').get().then((snapshot) => {
          snapshot.forEach(doc =>{
              ids.push(doc.id)
              console.log(correctFormat)
              console.log(doc.data().date)
             
             if(correctFormat === doc.data().date)    
             {                  
                    arr.push({
                        description : doc.data().details,
                        dish_title : doc.data().title,
                        price : doc.data().price,
                        rating : doc.data().rating,
                        image: doc.data().image,
                        
                    })
            }
            alert("there is no posts on this date for selected user")

          })
        
          this.setState({
              docs : arr,
              postids : ids,
              
              startDate : date, 
              mydate : correctFormat
          })
       
     }) 
}

PostDelete(Ids) {
    

    firebaseUsers.doc(this.state.sellerId).collection('posts').doc(Ids).delete();
    this.setState({
        nothing : " "
    })

}


    render(){
        console.log();
        return(
            <AdminLayout>
                    {
                        this.state.docs.map((doc,i) =>{
                            
                            return(  
                                <div>
                                    <div className='datePicker'>
                                        <h3 style={{ color: '#fff', }}>Search By Date</h3>
                                        
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onSelect ={this.handleSelect.bind(this)}
                                                onChange={this.handleChange}
                                                dateFormat='MM/dd/yyyy'
                                                placeholderText="Click to select a date" 
                                            />
                                        
                                    </div>   
                            
                                    <div className="card_block" key={i}>
                                        
                                        <div className='imageBox'>
                                            <img className="imagestyle" src={doc.image} />
                                        </div>

                                        <div className='leftBox'>

                                            <div className='boxes'>
                                                <div style={{ float: 'left' }}>
                                                    <h3>
                                                        Dish Title
                                                    </h3>
                                                </div>

                                                <div style={{ float: 'right', width: 600 }}>
                                                    <p>
                                                        {doc.dish_title}
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{ clear: 'both' }}></div>

                                            <div className='boxes'>
                                                <div style={{ float: 'left' }}>
                                                    <h3>
                                                        Description
                                                    </h3>
                                                </div>

                                                <div style={{ float: 'right', width: 600 }}>
                                                    <p>
                                                        {doc.description}
                                                    </p>
                                                </div>

                                            </div>

                                            <div style={{ clear: 'both' }}></div>

                                            <div className='boxes'>
                                                <div style={{ float: 'left' }}>
                                                    <h3>
                                                        Price
                                                    </h3>
                                                </div>

                                                <div style={{ float: 'right', width: 600 }}>
                                                    <p>
                                                        {doc.price}
                                                    </p>
                                                </div>

                                            </div>
                                        
                                        </div>

                                        <div className='rightBox'>

                                            <div className='button'>

                                                <Link to={ `/editPosts/${this.state.postids[i]}+${this.state.sellerId}` } >
                                                    <strong> Edit Post</strong>
                                                </Link>
                                        
                                            </div>

                

                                            <button className="button" onClick={() => this.PostDelete( this.state.postids[i] )} >
                                                <strong> Delete Post  </strong>
                                            </button>
                                        
                                        </div>         
                                        
                                    </div>

                                </div>
                               
                            );

                        })
                        
                    }
                         
            </AdminLayout>
        )
    }
}

export default SeePosts;