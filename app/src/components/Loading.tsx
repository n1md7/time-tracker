import React from 'react';
import {Spinner} from "react-bootstrap";

type LoadingType = {
  text?: string
}
const Loading = ({text = 'Loading...'}: LoadingType) => (
  <div className="d-flex flex-column justify-content-center" style={{height: '100vh'}}>
    <div className="text-center mb-2 text-secondary text-muted">{text}</div>
    <Spinner className="align-self-center" animation="border" variant="secondary"/>
  </div>
);

export default Loading;