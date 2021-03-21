import React from 'react';

type NoDataType = {
  text: string
}
const NoData = ({text}: NoDataType) => (
  <div className="row mt-3 justify-content-center no-gutters">
    <div className="col-12">
      <h6 className="my-3 text-center text-muted">{text}</h6>
    </div>
  </div>
);

export default NoData;