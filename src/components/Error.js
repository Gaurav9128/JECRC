import React, { useState } from 'react'

import HashLoader from 'react-spinners/HashLoader'; // Correct import of HashLoader
import { css } from 'styled-components';

function Error() {
  const [loading] = useState(true);
  const [color] = useState("#000000"); // Initialize color state
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div style={{marginTop:'150px'}}>
    <div className="sweet-loading text-center">
      <HashLoader
        color={color}
        loading={loading}
        css={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  </div>
  );
}

export default Error