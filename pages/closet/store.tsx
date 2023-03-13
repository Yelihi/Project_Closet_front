import React, { useEffect } from 'react';
import styled from 'styled-components';

import Link from 'next/link';

import { Breadcrumb } from 'antd';

import { AiOutlineDatabase } from 'react-icons/ai';
import { GiPayMoney } from 'react-icons/gi';
import { CgRowFirst } from 'react-icons/cg';

import PageLayout from '../../components/recycle/PageLayout';
import PageMainLayout from '../../components/recycle/main/PageMainLayout';
import ProcessingDataCard from '../../components/recycle/ProcessingDataCard';

import { media } from '../../styles/media';

const store = () => {
  return (
    <PageLayout>
      <PageMainLayout istitle={false}>
        <HandleContainer>
          <CustomBread separator='>'>
            <Breadcrumb.Item>
              <Link href='/closet/overview'>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Store</Breadcrumb.Item>
          </CustomBread>
        </HandleContainer>
        <TitleSection>
          <dl>
            <Title>CHECK YOUR ITEMS</Title>
            <SubTitle>
              저장하신 전체 의류를 확인하실 수 있습니다.
              <br />
              카테고리별로 분류가 가능하며 원하시면 삭제도 가능합니다만 삭제는 신중하게 결정하시길 바랍니다.
              <br />
              개별 의류를 선택하시면 상세페이지로 이동합니다.
            </SubTitle>
          </dl>
        </TitleSection>
        <CardSection>
          <ProcessingDataCard Icon={<AiOutlineDatabase className='icon' />} DataTitle='Total Clothes' LastData={40} CurrentData={50} />
          <ProcessingDataCard Icon={<GiPayMoney className='icon' />} DataTitle='Total Consumption' LastData={1200000} CurrentData={1500000} />
          <ProcessingDataCard Icon={<CgRowFirst className='icon' />} DataTitle='Most Unit' LastData={12} CurrentData={15} Categori='Outer' />
        </CardSection>
        store
      </PageMainLayout>
    </PageLayout>
  );
};

export default store;

const HandleContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 15px 0;
`;

const CustomBread = styled(Breadcrumb)`
  margin-bottom: 30px;
  .ant-breadcrumb-link {
    font-family: ${({ theme }) => theme.font.Efont};
    font-weight: ${({ theme }) => theme.fontWeight.Medium};

    > a {
      font-family: ${({ theme }) => theme.font.Efont};
      font-weight: ${({ theme }) => theme.fontWeight.Light};
    }
  }
`;

const TitleSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const Title = styled.dt`
  font-size: 25px;
  line-height: 25px;
  font-family: ${({ theme }) => theme.font.Logo};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  margin-bottom: 20px;
`;

const SubTitle = styled.dd`
  display: block;
  font-size: clamp(9px, 2.2vw, 15px);
  line-height: 18px;
  font-family: ${({ theme }) => theme.font.Logo};
  font-weight: ${({ theme }) => theme.fontWeight.Light};
  margin-bottom: 10px;
  white-space: pre-wrap;
`;

const CardSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 15px;
  margin-bottom: 20px;

  ${media.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
`;
