import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form,FormGroup, Label,Input} from 'reactstrap';

class Login extends Component {
constructor(props){
    super(props);
}


render(){
    return (
        <div  style={{marginTop:50}}>
                <div className="container" >
                    <div className="row">

                        <div className="col-md-4 col-md-offset-4" style={{paddingTop:30}}>
            
                            <h4>Login</h4>
                                <Form  method="POST" action="/api/user/login">
                                    <FormGroup>
                                        <Label for="emailField">E-mail</Label>
                                        <Input type="email" onChange={(e)=>{this.setState({email: e.target.value})}} style={{borderRadius:30}} name="email" id="emailField" placeholder="someone@example.com" required={true}/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label for="passwordField">Password</Label>
                                            <Input type="password" name="password" onChange={(e)=>{this.setState({password: e.target.value})}} style={{borderRadius:30}} id="passwordField" placeholder="your password here" max={8} required={true}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="reset" outline color="warning" size="sm" className="" style={{borderRadius:30}}>RESET FIELDS</Button>
                                        <Button type="submit" outline color="primary" size="sm"  className="float-right" style={{marginLeft:7,borderRadius:30}}>LOGIN</Button>
                                    </FormGroup>
                                </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;