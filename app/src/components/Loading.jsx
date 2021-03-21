import React from 'react';
import {Spinner} from "react-bootstrap";

const Loading = () => (
  <div className="d-flex flex-column justify-content-center" style={{height: '100vh'}}>
    <div className="text-center mb-2 text-secondary text-muted">Loading...</div>
    <Spinner className="align-self-center" animation="border" variant="secondary" size="lg"/>
  </div>
);

export default Loading;