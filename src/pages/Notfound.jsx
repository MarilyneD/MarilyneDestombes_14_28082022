import ModalPlugIn from 'marilyne-simplemodal-react';
import React from 'react';



const Notfound = () => {
    return (
      <div className="notfound">
        NOT FOUND
        <ModalPlugIn
          modalVisible={true}
          mainTexT={"Oups mauvaise direction"}
          childrenText={"KESTUFOULA ???"}
        />
        
      </div>
    );
};

export default Notfound;