import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form,FormGroup, Label,Input, Container,Row,Col} from 'reactstrap';

class Login extends Component {
constructor(props){
    super(props);
}


render(){
    return (
        <div  style={{marginTop:50}}>
        <Container>
        <Row>
        <Col md={4}></Col>
         <Col md={4}>
       
        	<h1>Account Login </h1>
            <Form  method="POST" action="/api/user/login">
            <FormGroup>
                <Label for="emailField">E-mail</Label>
                <Input type="email" onChange={(e)=>{this.setState({email: e.target.value})}} name="email" id="emailField" placeholder="someone@example.com" required={true}/>
            </FormGroup>
            <FormGroup>
                    <Label for="passwordField">Password</Label>
                    <Input type="password" name="password" onChange={(e)=>{this.setState({password: e.target.value})}} id="passwordField" placeholder="your password here" max={8} required={true}/>
            </FormGroup>
            <FormGroup>
                <div className="float-right">
                <Button type="reset" outline color="warning" size="sm" style={{marginRight:10}} >RESET FIELDS</Button>
                <Button type="submit" outline color="primary" size="sm"  >LOGIN</Button>
                </div>
            </FormGroup>
     </Form>
     </Col>
     <Col md={4}></Col>
        </Row>
        </Container>
       
      

       </div>
        
        )
    }

}

export default Login;