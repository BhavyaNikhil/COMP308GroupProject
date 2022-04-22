import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {
    return (
        <div className="container bg-Color">
            <div className="span12 div-style">
            <center><img src="/Assets/hospitalLogo.png" alt="logo" width="170" height="100"></img>
                <h1 className="h2-style fore-Color font-main"> Nurse Patient Application</h1>
                <p className="fore-Color">We do our best for you & your health.</p>
                <img src="/Assets/hosp.gif" alt="hosp" width="200"></img>
                <h4 className="fore-Color">
                    COMP 308 GROUP PROJECT
                </h4>
                <p className="p-style fore-Color">                    
                    <a href="/login">SIGN IN</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="/register">SIGN UP</a><br></br><br></br><br></br>
                </p>
            </center>
            </div>
        </div>
    );
}

export default withRouter(Home);
