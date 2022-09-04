import React from 'react';
import TanstackTable from '../components/TanstackTable.tsx';

const EmployeesList = () => {


const columnsTTTTTZTZTZT = [
    { title: 'First Name', data: 'firstName' },
    { title: 'Last Name', data: 'lastName' },
    { title: 'Start Date', data: 'startDate' },
    { title: 'Department', data: 'department' },
    { title: 'Date of Birth', data: 'dateOfBirth' },
    { title: 'Street', data: 'street' },
    { title: 'City', data: 'city' },
    { title: 'State', data: 'state' },
    { title: 'Zip Code', data: 'zipCode' },
]

    return (

        <div>
                <TanstackTable /> 
        </div>
    );
};

export default EmployeesList;