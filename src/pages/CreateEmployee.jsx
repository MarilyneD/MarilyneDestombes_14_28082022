import React from 'react';
import { NavLink } from 'react-router-dom';

const CreateEmployee = () => {


    const handleSaveEmployee = async (e) => {
        e.preventDefault();
      };


    return (
        
        <div className="create-employee-container">
          <h2>Create Employee</h2>
          <form onSubmit={e => handleSaveEmployee(e)} id="create-employee">
          <div className="input-wrapper">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" />
              </div>
              <div className="input-wrapper">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" />
              </div>

              <div className="input-wrapper">
              <label htmlFor="date-of-birth">Date of Birth</label>
              <input type="text" id="date-of-birth"  />
              </div>

              <div className="input-wrapper">
              <label htmlFor="start-date">Start Date</label>
              <input type="text" id="start-date"  />
              </div>
            <fieldset className="address">
                  <legend>Address</legend>

                  <label htmlFor="street">Street</label>
                  <input id="street" type="text" />

                  <label htmlFor="city">City</label>
                  <input id="city" type="text" />

                  <label htmlFor="state">State</label>
                  <select name="state" id="state"></select>

                  <label htmlFor="zip-code">Zip Code</label>
                  <input id="zip-code" type="number" />
              </fieldset> 

            <label htmlFor="department">Department</label>
              <select name="department" id="department">
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Legal</option>
              </select>


              <input className="sign-in-button" type="submit" value="Save"/>
          </form>
          <span id="confirmation" className="modal">Employee Created!</span>
      </div>
      


    );
};

export default CreateEmployee;