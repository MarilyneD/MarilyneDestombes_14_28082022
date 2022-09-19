import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TanstackMockedTable from '../components/TanstackMockedTable.tsx';


const EmployeesList = () => {
    
    const globalStore = useSelector(state => state.employees)
    let navigate = useNavigate();
    useEffect(() => { if(!globalStore.employeesList){navigate("/")}       
      });



    return (
      <div className="employees-list-container">
        <TanstackMockedTable />
      </div>
    );
};

export default EmployeesList;