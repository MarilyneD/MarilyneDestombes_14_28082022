import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addemployeesList } from '../feature/employeesSlice';


const Home = () => {

  const [mainData, setMainData] = useState([]);
  const dispatch = useDispatch();
  

   
  useEffect(() => {
    (async () => {
      const responseData = await axios.get("/mocked-data/mockedEmployeesData.json").then((res) => res.data).catch(function (error) {
        if (error.response) {
          console.log("error.response.data", error.response.data);
        }
      });
      dispatch(addemployeesList(responseData));
      setMainData(responseData);
    })();
  }, []);

   


    return (
      <div className='home-container'>
      <h1> Welcome to HRnet !</h1>
      <h2> This internal web application manages employee records <br /> for our financial company WealthHealth</h2>
      <h3>you have the possibility to add a new employee <br /> and access the list of current employees</h3>
      </div>
      
    );
};



export default Home;