import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function DailyInfo(props) {
    const [screen, setScreen] = useState("auth");

    const readCookie = async () => {
        try {
            const res = await axios.get("/api/read_cookie");

            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
            }
        } catch (e) {
            setScreen("auth");
            console.log(e);
        }
    };

    useEffect(() => {
        readCookie();
    }, []);

    let patientId = screen;

    const [dailyInfo, setDailyInfo] = useState({
        _id: "",
        pulseRate: "",
        bloodPressure: "",
        weight: "",
        temperature: "",
        respiratoryRate: "",
        lastModified: "",
        owner: "",
        created: ""
    });

    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const apiUrl = "http://localhost:3000/api/dailyInfo/create";

    const saveDailyInfo = (e) => {
        setShowLoading(true);
        let currDateTime = new Date();
        e.preventDefault();
        const data = {
            pulseRate: dailyInfo.pulseRate,
            bloodPressure: dailyInfo.bloodPressure,
            weight: dailyInfo.weight,
            temperature: dailyInfo.temperature,
            respiratoryRate: dailyInfo.respiratoryRate,
            lastModified: currDateTime,
            owner: patientId,
            created: currDateTime
        };

        axios
        .post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            if (result.data.screen === "error") {
                setShowError(true);
                console.log("error: " + showError);
            } else {
                props.history.push("/dailyInfoHistory");
            }
        })
        .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setDailyInfo({ ...dailyInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid  d-flex justify-content-center margins bg-Color fore-Color">
        <div className="col-6 div-style bg-Color3">
            <center>
                    <h2 className="h2-style">Add My Daily Info</h2></center>

                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                <div className="container-fluid margins">
                    {showError && (
                        <span>
                        There is something wrong...
                        </span>
                    )}
                        <Form onSubmit={saveDailyInfo}>
                            <Form.Group>
                                <Form.Label>Pulse Rate (per minute)</Form.Label>
                                <Form.Control
                                type="number"
                                name="pulseRate"
                                id="pulseRate"
                                placeholder="A normal resting heart rate ranges from 60 to 100 beats per minute"
                                min="1"
                                step="1"
                                value={dailyInfo.pulseRate}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Blood Pressure (systolic/diastolic mm Hg)</Form.Label>
                                <Form.Control
                                type="text"
                                name="bloodPressure"
                                id="bloodPressure"
                                placeholder="A normal blood pressure level is less than 120/80 mmHg"
                                pattern="^\d{2,3}\/\d{2,3}$"
                                value={dailyInfo.bloodPressure}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Weight (lb)</Form.Label>
                                <Form.Control
                                type="number"
                                name="weight"
                                id="weight"
                                placeholder="Ideal weight varies based on height and gender"
                                min="1"
                                step="0.1"
                                value={dailyInfo.weight}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Temperature (°C)</Form.Label>
                                <Form.Control
                                type="number"
                                name="temperature"
                                id="temperature"
                                placeholder="Normal body temperature range between 36.1 C and 37.2 C"
                                min="1"
                                step="0.1"
                                value={dailyInfo.temperature}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Respiratory Rate (per minute)</Form.Label>
                                <Form.Control
                                type="number"
                                name="respiratoryRate"
                                id="respiratoryRate"
                                placeholder="Normal respiration rates at rest range from 12 to 16 breaths per minute"
                                min="1"
                                step="1"
                                value={dailyInfo.respiratoryRate}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            
                            <div className="text-center">
                                <Button variant="info col-6" type="submit">
                                    SAVE
                                </Button>
                            </div><br></br>
                        </Form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(DailyInfo);