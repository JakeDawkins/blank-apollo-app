import React from 'react';
import ReactDOM from 'react-dom';

export default props => {
  return (
    <div>
      <p>
        {props.firstName}
        <br />
        {props.lastName}
      </p>
    </div>
  );
};
