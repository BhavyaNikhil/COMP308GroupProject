import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";


function VitalHistoryView(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const apiUrl = "http://localhost:3000/api/clinicalVisits";
    const patientId =  props.match.params.id;

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    let array = [];

    data.map(item => {
        if (item.patient === patientId) {
            array.push(item);
            return item;
        }
    });

    const editVital = id => {
        props.history.push({
            pathname: "/vitalEdit/" + id
        });
    };

    const displayAllVitalHistoryTable = array.map((vital, idx) => {
        return (
            <tr key={idx}>
                <td>{vital.bodyTemperature}</td>
                <td>{vital.heartRate}</td>
                <td>{vital.bloodPressure}</td>
                <td>{vital.respiratoryRate}</td>
                <td>{vital.created}</td>
                <td>
                    <Button
                        type="button"
                        variant="info"
                        onClick={() => {
                            editVital(vital._id);
                        }}
                    >
                        Edit
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <div className="container-fluid d-flex justify-content-center margins bg-Color fore-Color">
            <div className="col-10 div-style bg-Color3">
                    <center><h2 className="h2-style">Patient Vital History</h2></center>
                
                <br />

                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}

                <div className="container-fluid margins bg-Color3">
                    {showError && (
                        <span>
                        There is something wrong...
                        </span>
                    )}
                </div>
                    
                        <table className="table table-info">
                            <thead className="thead-dark">
                            <tr>
                                <th>Body Temperature (°C)</th>
                                <th>Heart Rate (per minute)</th>
                                <th>Blood Pressure (systolic/diastolic mmHg)</th>
                                <th>Repository Rate (per minute)</th>
                                <th>Entry Date & Time</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody className="tr p-10 pointer">{displayAllVitalHistoryTable}</tbody>
                        </table>
                    </div>
                </div>
    );
}

export default withRouter(VitalHistoryView);
