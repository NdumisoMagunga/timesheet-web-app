import React, {Component} from 'react';
import logo from '../assets/images/logo.png'
import {  Collapse, 
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

      } from 'reactstrap';
      import {Link} from 'react-router-dom';
      import { Avatar,Chip } from 'material-ui';
      import { white } from 'material-ui/styles/colors';

class Navigation extends Component {
 
    constructor(props){
        super(props);

        this.state = {
            "isOpen": false,
            "modal":false,
            "dropdownOpen":false
        }
    }


    render(){

        return (
            <nav className="pos-stc">
            <Navbar color="faded" light expand="md">
              <NavbarBrand><img  style={{width:120,height:35}} className="brand-image"  src={logo}  /> <i style={{fontWeight:300,fontStyle:"normal"}}></i> </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                  <NavLink  href="http://localhost:2000/api/logout">Login</NavLink>
                  </NavItem>
                  
                 
              {(()=>{
                if (this.props.auth){
               return (
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleChip} className="white" >
                    <DropdownToggle className="white"  size="sm" color="white">
                      

                      <Chip backgroundColor={white}>
                    
                        {this.props.auth.firstname} {this.props.auth.lastname} 
                      </Chip>
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem header size="sm">Menu </DropdownItem>
                    <DropdownItem size="sm" > <Link to="/">Profile </Link></DropdownItem>
                    <DropdownItem divider /> 
                    <DropdownItem size="sm" >
                    <NavItem>
                    <NavLink  href="http://localhost:2000/api/logout">logout</NavLink>
                  </NavItem>
                    </DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
                )   
              }})()}

                
                  
                </Nav>
              </Collapse>
            </Navbar>
         
          </nav>
        )

    }

}


export default Navigation;