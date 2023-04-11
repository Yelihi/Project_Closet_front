import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import useSWR from 'swr';
import { media } from '../../styles/media';

import axios from 'axios';
import { END } from 'redux-saga';

import { GetServerSidePropsContext } from 'next';
import type { SagaStore } from '../../store/configureStore';

import wrapper from '../../store/configureStore';

import * as t from '../../reducers/type';

import IntroSection from '../../components/main/IntroSection';
import TotalData from '../../components/main/TotalData';
import RecentlyItem from '../../components/main/RecentlyItem';
import CurrentYearPrice from '../../components/main/CurrentYearPrice';
import LastItem from '../../components/main/LastItem';
import Nav from '../../components/Nav';

import Intersection from '../../components/recycle/element/Intersection';
import { backUrl, mutateFetcher } from '../../config/config';

const Overview = () => {
  const { data, error, isLoading } = useSWR(`${backUrl}/posts/overview`, mutateFetcher);
  console.log('overview data', data);

  if (isLoading) return null;
  return (
    <Container>
      <NavRow>
        <Nav />
      </NavRow>
      <Intersection></Intersection>
      <IntroRow>
        <IntroSection />
      </IntroRow>
      <DataRow>
        <TotalData data={data.categori} total={data.totalNumber} />
      </DataRow>
      <ResRow>
        <RecentlyItem items={data.lastDatas} />
      </ResRow>
      <InfoRow>
        <LastItem item={data.theOldestData} />
      </InfoRow>
      <LastDataRow>
        <CurrentYearPrice totalPrice={data.totalPrice} currentPrice={data.currentYearPrice} />
      </LastDataRow>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    // store에서 dispatch 하는 api
    type: t.LOAD_TO_MY_INFO_REQUEST,
  });

  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();
  // if (!store.getState().user.me) {
  //   // getState() 는 store의 트리를 가져와준다.
  //   return {
  //     redirect: {
  //       destination: '/userlogin',
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  };
});

export default React.memo(Overview);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 50px;
  padding: 24px;
  ${media.tablet} {
    display: grid;
    grid-template-rows: 60px 1px 0.45fr 0.45fr;
    grid-template-columns: 0.65fr 0.35fr;
    grid-template-areas:
      'nav nav'
      'inter inter'
      'intro data'
      'recently myinfo'
      'recently lastData';
    gap: 1.5rem;
    height: 100%;
  }
`;

export const NavRow = styled.div`
  grid-area: nav;
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 2;

  ${media.tablet} {
    display: flex;
    align-items: center;
    position: relative;
    height: auto;
    border-radius: 10px;
  }
`;

// export const Intersection = styled.div`
//   grid-area: inter;
//   width: 100%;
//   height: 1px;
//   background-color: rgba(30, 40, 51, 0.0671438);
// `;

const IntroRow = styled.div`
  grid-area: intro;
  display: flex;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  height: auto;
  ${media.tablet} {
    display: flex;
    align-items: center;
    height: auto;
    margin-top: 0;
  }
`;

const DataRow = styled.div`
  grid-area: data;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  ${media.tablet} {
    display: flex;
    align-items: center;
    height: auto;
  }
`;

const ResRow = styled.div`
  grid-area: recently;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  ${media.tablet} {
    display: flex;
    align-items: center;
    height: auto;
  }
`;

const InfoRow = styled.div`
  grid-area: myinfo;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  ${media.tablet} {
    display: flex;
    align-items: center;
    height: auto;
  }
`;

const LastDataRow = styled(InfoRow)`
  grid-area: lastData;
`;
