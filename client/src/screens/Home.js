import React, {Component} from 'react';


class Home extends Component {
constructor(props){
    super(props);
}


render(){
    return (
        <div>
        <div className="jumbotron bg-parallax chairs-back bg-image overlay" style={{marginTop:50}}>
        <div className="container">
        <div className="row">
            <div className="col-md-8 col-md-offset-2" style={{padding:40}}>
                <h1 className="orange" style={{fontWeight:"300"}}>Welcome to Itthynk Timesheet</h1>
                <p className="lead white-text">Managing Timesheets made practical.</p>
                <a className="main-button icon-button" href="/register">Get Started!</a>
            </div>
        </div>
    </div>
        </div>
        
        
        </div>
    )
}

}

export default Home;