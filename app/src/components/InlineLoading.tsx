import React from 'react';
import {Spinner} from "react-bootstrap";

const InlineLoading = () => (
  <div className="row justify-content-center no-gutters">
    <div className="col text-center">
      <Spinner className="align-self-center" size={'sm'} animation="border" variant="secondary"/>
    </div>
  </div>
);

export default InlineLoading;