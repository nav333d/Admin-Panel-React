import React ,{ Component } from 'react'
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebaseComplains } from '../../../firebase';

class Complains extends Component{

    state ={
      complainerInfo : []
    }
    componentDidMount(){
        const arr = []
        firebaseComplains.get().then((snapshot)=>{
            snapshot.docs.forEach(doc =>{
                let firebasedata = doc.data();
                arr.push(firebasedata)

            })
            this.setState({
                complainerInfo : arr
            })


        })
    }
    render(){
        return(
            <AdminLayout>
                   

                        { 
                            this.state.complainerInfo ?
                                this.state.complainerInfo.map((complain ,i)=>{
                                    return(
                                        <div className="card_block">
                                             <div className="complain_box">
                                                 <div key={i}>
                                                     <div className="date">
                                                          {complain.date}
                                                     </div>
                                                  <div className="complain_form">
                                                     {complain.usertype}
                                                 </div>
                                                 <div className="Actual_Text">
                                                     {complain.Text}
                                                 </div>
                                             </div>
                                        </div>
                                        </div>
                                    )

                                })


                            :null

                            }
                       
                       
            </AdminLayout>
        )
    }
}

export default Complains;