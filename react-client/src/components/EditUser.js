import React, { useState, useEffect } from "react";
import axios from "axios";
import {Jumbotron,Spinner,Button,Form,ButtonToolbar,ButtonGroup} from "react-bootstrap";
import { withRouter } from "react-router-dom";

function EditUser(props) {
    const [user, setUser] = useState({
        _id: "",
        username:"",
        firstName: "",
        lastName: "",
        password: "",
        role:"",
        lastLoggedIn: "",
        verified: "",
        created: "",
    });
    const [showLoading, setShowLoading] = useState(true);
    const [userRole, setUserRole] = useState();
    const apiUrl = "http://localhost:3000/users/" + props.match.params.id;
    //runs only once after the first render
    useEffect(() => {
        setShowLoading(false);
        //call api
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setUser(result.data);
            console.log(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const updateUser = e => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            username: user.username,
            firstName: user.firstName.toUpperCase(),
            lastName: user.lastName.toUpperCase(),
            password: user.password,
            role: userRole,
            lastLoggedIn: user.lastLoggedIn,
            password: user.password,
            verified: user.verified,
            created: user.created,
        };
        axios
            .put(apiUrl, data)
            .then(result => {
                setShowLoading(false);
                props.history.push("/show/" + result.data._id);
            })
            .catch(error => setShowLoading(false));
    };
    //runs when user enters a field
    const onChange = e => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid  d-flex justify-content-center margins bg-Color fore-Color">
            <div className="col-6 div-style bg-Color3">
            <center><h2 className="h2-style">Edit User</h2></center>
                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                <div className="container-fluid margins bg-Color3">
                    <Form onSubmit={updateUser}>
                        <Form.Group>
                            <Form.Label> Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                id="username"
                                value={user.username}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                value={user.firstName}
                                onChange={onChange}
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
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Existing User Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                id="role"
                                value={user.role}
                                readonly="readonly"
                            />
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar aria-label="buttons for role">
                                <Form.Label>Select Role</Form.Label>
                                <div className="margins-left">
                                    <ButtonGroup className="mr-4" aria-label="role" required name="role" id="role" value={user.role}>
                                        <Button variant="outline-secondary" name="role" id="role" onClick={e => setUserRole("Patient")} value={user.role}><img src="/Assets/patient.png" alt="patient" width="40"></img>Patient</Button>
                                        <Button variant="outline-success" name="role" id="role" onClick={e => setUserRole("Nurse")} value={user.role}><img src="/Assets/nurse.png" alt="nurse" width="50"></img>Nurse</Button>
                                    </ButtonGroup>
                                </div>

                            </ButtonToolbar>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="info col-10" type="submit">
                                UPDATE
            </Button>
</div><br></br>
                       
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(EditUser);
