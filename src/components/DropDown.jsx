import React from 'react';

const DropDown = ({name, id, onChangeFunction, optionsArray}) => {

    return (
        <div>
            <select
            name={name}
            id={id}
            onChange={(e) => onChangeFunction(e)}>
           {optionsArray.map(option =><option key={option.value} value={option.value}>{option}</option>)}
          </select>
            
        </div>
    );
};

export default DropDown;