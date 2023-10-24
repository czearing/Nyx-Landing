import * as React from 'react';
import { Stars } from '../components/LandingArt/Stars';
import { NewsLetterComponent } from '../components';

const IndexPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* <div>
        <h1>Section Above Stars</h1>
        <p>This is some content above the stars.</p>
      </div> */}

      {/* The Stars section with a specific height */}
      <div>
        <Stars />
      </div>

      {/* Content that should go below the stars section */}
      <div>
        <h1>Section Below Stars</h1>
        <p>This is some content below the stars.</p>
      </div>
    </div>
  );
};
export default IndexPage;
