import React,{ Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';


import { firebaseUsers } from '../../../firebase';


class EditPost extends Component{



    state = {
        userId : '',
        postId : '',
        docs : [],
        postId : '',
        
        title : '',
        details : '',
        price : ''
    }

    componentDidMount(){
        let ID = this.props.match.params
        const ids = ID.id.split('+');
        
        
        let arr = [];
        firebaseUsers.onSnapshot(snapShot => {
            snapShot.forEach(doc => {
                if(doc.id === ids[1])
                {
                    firebaseUsers.doc(doc.id).collection('posts').onSnapshot(value => {
                        value.forEach(doc1 => {
                            
                            arr.push({
                                description : doc1.data().details,
                                dish_title : doc1.data().title,
                                price : doc1.data().price,
                            })

                            // this.setState({  
                            //     description: doc1.data().description,
                            //     dish_title : doc1.data().dish_title,
                            //     price : doc1.data().price,
                            // })

                        })
                        this.setState({
                            docs : arr,
                            userId : ids[1],
                            postId : ids[0],
                            details: arr[0].description,
                            title: arr[0].dish_title,
                            price: arr[0].price

                        })

                    })
                }
                             
            })
        })
    }
    handleTitleChange(event){
        let val = event.target.value
        
       this.setState({
           title : val
       })
    }
    handleDescriptionChange(event){
        let val = event.target.value

        this.setState({
            details : val
        })

        
    }
    handlePriceChange(event){
        let val = event.target.value
        
        this.setState({
            price : val
        })
    }

    updatePost = () => {

        const { title, details, price } = this.state;
        firebaseUsers.onSnapshot(snapShot => {
            snapShot.forEach(doc => {
                if(doc.id === this.state.userId)
                {
                    
                    firebaseUsers.doc(this.state.userId).collection('posts').doc(this.state.postId).update({
                        title,
                        details,
                        price
                 }).then(data => {
                    console.log(`Updated! ${data}`);
                }).catch(error => {
                    console.log(error);
                })
            }
            })
        })
                          
    }


        render(){
           return(

            <AdminLayout>
                {
                   
                                  
                    <div className="editmatch_dialog_wrapper">
                        <form>
              
                        <div><h1> Title</h1> </div>
                        <input type="text" name="dish_title" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
                         
                            <div><h1> Description</h1> </div>
                            <input type="text" name="description" value={this.state.details} onChange={this.handleDescriptionChange.bind(this)}/>

                            <div><h1> Price </h1> </div>
                            <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange.bind(this)}/>
                            
                            <div className="button">
                                <input type="submit" name="btn" onClick={this.updatePost} />
                            </div>
                       
                        </form>
                    </div>
                        
                    
              
                }
               
                
            </AdminLayout>

        )
        
    }
}
export default EditPost;