import React, { useState } from "react";
import axios from "axios";
import {Spinner, Jumbotron, Form, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import { withRouter } from "react-router-dom";


function Register(props) {  // read the info from props, coming from the ancestor component
    const { screen, setScreen } = props;

    // called when user clicks on Logout button
    // to clear the cookie and set the screen state variable
    // back to its initial state.
    const deleteCookie = async () => {
        try {
            await axios.get("/api/signout");
            setScreen("auth");
        } catch (e) {
            console.log(e);
        }
    };
    deleteCookie();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "",
    lastLoggedIn: "",
    verified: "",
    created: "",
  });
  const [showLoading, setShowLoading] = useState(false);
    const [userRole, setUserRole] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/signup";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      username: user.username,
      firstName: user.firstName.toLowerCase(),
      lastName: user.lastName.toLowerCase(),
        role: userRole,
      lastLoggedIn: user.lastLoggedIn,
      password: user.password,
      verified: user.verified,
      created: user.created,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        if (result.data.screen === "error") {
          setShowError(true);
            setErrorMsg(result.data.message);
          console.log("error: " + showError);
        } else {
          props.history.push("/login");
        }
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
      <div className="container-fluid  d-flex justify-content-center margins bg-Color fore-Color">
      <div className="col-6 div-style bg-Color3">
      <center><h2 className="h2-style">Sign Up</h2></center>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        
        <div className="container-fluid margins bg-Color3">

        {showError && (
            <span className="p-10">
            {errorMsg}
            
            </span>
          )}

          <Form onSubmit={saveUser} className="bg-Color3">
              <Form.Group>
                <Form.Label> First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  value={user.firstName}
                  onChange={onChange}
                                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  value={user.lastName}
                  onChange={onChange}
                                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="username"
                  id="username"
                  placeholder="Enter email"
                  value={user.username}
                  onChange={onChange}
                                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={onChange}
                                  required
                />
                </Form.Group>
                <Form.Group>
                          <ButtonToolbar aria-label="buttons for role">
                                <Form.Label>Select Role</Form.Label>
                                <div className="margins-left">
                                      <ButtonGroup className="mr-4" aria-label="role" required name="role">
                                          <Button variant="outline-secondary" onClick={e => setUserRole("Patient")}><img src="/Assets/patient.png" alt="patient" width="40"></img>Patient</Button>
                                          <Button variant="outline-success" onClick={e => setUserRole("Nurse")}><img src="/Assets/nurse.png" alt="nurse" width="50"></img> Nurse</Button>
                                      </ButtonGroup>
                                </div>
                          </ButtonToolbar>
                </Form.Group>
                <div className="text-center">
                  <Button variant="info col-10" type="submit">
                    REGISTER
                  </Button>
              </div>
          </Form><br></br>
        </div>
        </div>
      </div>
  );
}

export default withRouter(Register);
