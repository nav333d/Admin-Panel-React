import React, {Component} from 'react';


import {firebaseAdmin} from '../../firebase';


class SignIn extends Component{

    state ={
        email : '',
        password : '',
        dbEmail : '',
        dbPassword : ''
    }

    componentDidMount(){
        let databaseEmail = ''
        let databasePasword = ''

        firebaseAdmin.get().then((snapshot) =>{
           snapshot.docs.forEach(doc =>{
                // console.log(doc.data().email)
                // if(doc.data().email === this.state.email && doc.data().password === this.state.password){
                //     alert("match ho gya")
                                    
                //  }
                databasePasword = doc.data().password
                databaseEmail = doc.data().email

            })
            console.log(databaseEmail + " "+ databasePasword)
            this.setState({
                dbEmail : databaseEmail,
                dbPassword : databasePasword
            })
        })
     

    }

    handleEmail(event){
        let val = event.target.value
        
        this.setState({
            email : val
        })
    }
    handlePasword(event){
        let val = event.target.value
        
        this.setState({
            password: val
        })
    }

    verifyCredentials = () => {

        console.log(this.state.email + " db ki "+ this.state.dbEmail)
        console.log(this.state.password + " pas ki " + this.state.dbPassword) 
                 if(this.state.email === this.state.dbEmail || this.state.password === this.state.dbpassword){
                   
                    this.props.history.push('/dashboard')
                                    
                 }
                 else{
                     alert(" Please Re-enterd!! you have enterd wrong Credentials or None")
                 }
           
        
    }


 
    

    // render(){
    //     return(
    //         <form>
    //         <label>
    //           Name:
    //           <input type="text" name="name" />
    //         </label>
    //         <input type="submit" value="Submit" />
    //       </form>
    //     )
    // }



    
//     state={
//         formError:false,
//         formSucess: '',
//         formdata: {
//             email:{
//                 element : 'input',
//                 value :'',
//                 config:{
//                     name:'email_input',
//                     type : 'email',
//                     placeholder: 'Enter your email'
//                 },
//                 validation :{
//                     required : true,
//                     email : true
//                 },
//                 valid : false,
//                 validationMessage : ''
//             },
//             password:{
//                 element : 'input',
//                 value :'',
//                 config:{
//                     name:'password_input',
//                     type : 'password',
//                     placeholder: 'Enter your password'
//                 },
//                 validation :{
//                     required : true,
                   
//                 },
//                 valid : false,
//                 validationMessage : ''
//             }
//         }
//     }

//    updateForm(element){
//     const newFormdata = {...this.state.formdata}
//     const newElement = {...newFormdata[element.id]}

//     newElement.value = element.event.target.value;

//     let validData = validate(newElement);
//     newElement.valid = validData[0];
//     newElement.validationMessage = validData[1];

//     newFormdata[element.id] = newElement;
     
//     this.setState({
//         formdata : newFormdata
//     })
//    }

//   submitForm (event){
//       event.preventDefault();

//       let dataToSubmit = {};
//       let formIsValid = true;

//       for(let key in this.state.formdata){
//           dataToSubmit[key] = this.state.formdata[key].value;
//           formIsValid = this.state.formdata[key].valid && formIsValid;
//       }
       
       
//         if(!formIsValid){
            
//             firebaseAdmin.get().then((snapshot) =>{
//                 snapshot.docs.forEach(doc =>{
//                     console.log(dataToSubmit.email);

//                     if(doc.data().email === dataToSubmit.email && doc.data().password === dataToSubmit.password){
//                         this.props.history.push('/dashboard')
//                     } else{
//                         this.setState({
//                             formError : true
//                         })
                        

//                     }
//                 })
//             })              
//         }else{
//           this.setState({
//               formError : true
//           })
//         }
//     }

    render(){
        return(
            <div className="container">
                <div className="signin_wrapper" style={{ margin : '100px'}}>
                    <form>

                    <h2> Please Login </h2>
            
               <input type="text" name="email" placeholder="Enter your Email" onChange={this.handleEmail.bind(this)} />
               <input type="password" name=" pasword"  placeholder="Enter your Password" onChange={this.handlePasword.bind(this)}/>

               <div className="button">
             
             <input type="submit" value="Submit" onClick={this.verifyCredentials} />
             </div>
               
                        {/* <h2>Please Login  </h2>
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element)=> this.updateForm(element)} 
                            />
                            <FormField
                                id={'password'} 
                                formdata={this.state.formdata.password}
                                change={(element)=> this.updateForm(element)} 
                            />
                            {
                                this.state.formError ?
                                    <div className ="error_label">Something is Wrong,try again.</div>
                                    :null
                            }
                            <button onClick={(event) =>this.submitForm(event)}> Log In </button> */}
                    </form>
                </div>
            </div>

        )
    }
}

export default SignIn;