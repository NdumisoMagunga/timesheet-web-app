import React, {Component} from 'react';
import logo from '../assets/images/logo.png'
import {  Collapse, 
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink as NavLin
      } from 'reactstrap';
      import {Link, NavLink } from 'react-router-dom';
   

      import {connect} from 'react-redux';
      import * as actions from '../actions'

class Navigation extends Component {
 
    constructor(props){
        super(props);

        this.state = {
            "isOpen": false,
            "modal":false,
            "dropdownOpen":false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
      this.setState({
        isOpen:!this.state.isOpen
      })
    }

    render(){

        return (
            <nav className="pos-stc">
            <Navbar color="faded" light expand="md">
              <NavbarBrand href="/"><img  style={{width:120,height:35}} className="brand-image"  src={logo}  /> <i style={{fontWeight:300,fontStyle:"normal"}}></i> </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>

                {!this.props.auth ? (
          
                  <NavItem >
                     <NavLink style={{marginLeft:10, marginRight:10}}  to="/register">Register</NavLink>
                  </NavItem>
               
                 ): null}

             {!this.props.auth ? (
          
             
              <NavItem>
                <NavLink style={{marginLeft:10, marginRight:10}} to="/login">Login</NavLink>
              </NavItem>
           
             ): null}

                  
                 
              {(()=>{
                if (this.props.auth){
               return (
                <NavItem >
                <NavLink className="nav-link" to="/profile">{this.props.auth.firstname} {this.props.auth.lastname} </NavLink>
              </NavItem>

                    
                        
                    
                 
                )   
              }})()}

              {this.props.auth ? (
                <NavItem >
                <NavLin style={{marginLeft:10, marginRight:10}}  href="/api/user/logout" to="/api/user/logout"><i className="fa fa-sign-out" /> Logout</NavLin>
              </NavItem>

              ): null}
                
                  
                </Nav>
              </Collapse>
            </Navbar>
         
          </nav>
        )

    }

}

function mapStateToProps(state){
return {
  auth:state.auth
  }
}

export default connect(mapStateToProps,actions)(Navigation);
