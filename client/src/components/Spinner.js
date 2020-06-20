import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => (
    <div
    style={{
      width: "100%",
      height: "100",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    >
        <Loader type="ThreeDots" color="#5A5A5A" height="100" width="100" marginTop="50%"/>
    </div>
);

export default Spinner;