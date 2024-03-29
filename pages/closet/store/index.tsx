import React from 'react';
import addHead from '../../../util/addHead';
import dynamic from 'next/dynamic';

import * as t from '../../../reducers/type';

import axios from 'axios';
import { END } from 'redux-saga';

import { GetServerSidePropsContext } from 'next';
import type { SagaStore } from '../../../store/configureStore';

import wrapper from '../../../store/configureStore';

import PageLayout from '../../../components/recycle/layout/PageLayout';
import PageMainLayout from '../../../components/recycle/layout/PageMainLayout';
import CustomBread from '../../../components/recycle/CustomBread';

import { modifyIndexArray } from '../../../util/Store/modifyData';
import { confirmEmptyState } from '../../../util/Store/confirmCondition';
import { useSelector } from 'react-redux';
import { rootReducerType } from '../../../reducers/types';
import useDeviceWidth from '../../../hooks/useDeviceWidth';
import { SWR } from '../../../util/SWR/API';
import { getSelectorsByUserAgent } from 'react-device-detect';

import StoreTitleSection from '../../../components/store/StoreTitleSection';
import StoreAddSection from '../../../components/store/StoreAddSection';

import StoreSummaryInfoSection from '../../../components/store/StoreSummaryInfoSection';

const SkeletonStore = dynamic(() => import('../../../components/store/SkeletonStore'));
const RenderErrorPage = dynamic(() => import('../../../components/state/error/RenderErrorPage'));
const RenderEmptyPage = dynamic(() => import('../../../components/state/empty/RenderEmptyPage'));
const StoreItemsSectionInDesk = dynamic(() => import('../../../components/store/StoreItemsSectionInDesk'));
const StoreItemsSectionInMobile = dynamic(() => import('../../../components/store/StoreItemsSectionInMobile'));

interface StoreProps {
  device: 'phone' | 'desktop';
}

const Store = ({ device }: StoreProps) => {
  const { userItems, indexArray, loadItemsLoding, deleteItemLoding, storeCategori, storeCurrentPage } = useSelector(
    (state: rootReducerType) => state.post
  );

  const { windowWidth } = useDeviceWidth(device);

  const { lastId } = modifyIndexArray(indexArray, storeCategori, storeCurrentPage);

  const FetchInDesktop = SWR.getItemsPerPagenation(lastId, storeCategori, windowWidth);
  const FetchInMobile = SWR.getInfiniteItems(storeCategori, windowWidth);

  const { itemsArrayInDesk, errorInDesk, isLoadingDesk } = FetchInDesktop;
  const { itemsArrayInMobile, isLoadingMobile, errorInMobile } = FetchInMobile;

  const isEmptyInDesk = confirmEmptyState(storeCategori);
  const isEmptyInMobile = confirmEmptyState(storeCategori);

  if (errorInDesk || errorInMobile) return <RenderErrorPage state='OverView' />;
  if (!userItems || userItems?.items.length === 0) return <RenderEmptyPage state='Store' />;
  if (isEmptyInDesk(isLoadingDesk, itemsArrayInDesk)) return <RenderEmptyPage state='Store' />;
  if (isEmptyInMobile(isLoadingMobile, itemsArrayInMobile)) return <RenderEmptyPage state='Store' />;

  return (
    <SkeletonStore loadItemsLoading={loadItemsLoding} deleteItemLoding={deleteItemLoding} windowWidth={windowWidth}>
      <PageLayout>
        <PageMainLayout istitle={false}>
          <CustomBread nextPage='Store' />
          <StoreTitleSection />
          <StoreSummaryInfoSection />
          <StoreAddSection />
          {windowWidth === 'desktop' ? <StoreItemsSectionInDesk windowWidth={windowWidth} /> : null}
          {windowWidth === 'phone' ? <StoreItemsSectionInMobile windowWidth={windowWidth} /> : null}
        </PageMainLayout>
      </PageLayout>
    </SkeletonStore>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const userAgent = context.req ? context.req.headers['user-agent']! : '';

  const { isMobile } = getSelectorsByUserAgent(userAgent);
  store.dispatch({
    // store에서 dispatch 하는 api
    type: t.LOAD_TO_MY_INFO_REQUEST,
  });

  store.dispatch({
    type: t.LOAD_ITEMS_REQUEST,
  });

  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();
  return {
    props: {
      device: isMobile ? 'phone' : 'desktop',
    },
  };
});

export default addHead(Store, 'closet', '이 페이지는 저장한 의류 전체를 보여주는 페이지입니다.');
