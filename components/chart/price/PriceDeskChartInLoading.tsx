import React from 'react';
import styled from 'styled-components';

const PriceDeskChartInLoading = () => {
  return (
    <PriceChartSection>
      <SkeletonDiv />
    </PriceChartSection>
  );
};

export default PriceDeskChartInLoading;

const PriceChartSection = styled.section`
  width: 100%;
  height: 50vh;
`;

const SkeletonDiv = styled.div`
  width: 100%;
  height: 485px;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.hoverGrey};
  ${({ theme }) => theme.animation.fade({ name: 'PriceChartDesktop' })}
`;
