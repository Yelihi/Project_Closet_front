import React, { useEffect } from 'react';
import styled from 'styled-components';

import PageLayout from '../../../components/recycle/PageLayout';
import KeepWorking from '../../../components/recycle/KeepWorking';

const price = () => {
  return (
    <PageLayout>
      <TestContainer>
        <KeepWorking height={100} />
      </TestContainer>
    </PageLayout>
  );
};

export default price;

const TestContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
`;
