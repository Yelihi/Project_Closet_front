import React, { useCallback } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import LinkCardLayout from '../recycle/layout/LinkCardLayout';
import { ItemsArray } from '../store/TableData';
import ListItem, { SkeletonListItem } from '../recycle/ListItem';

type RecentlyProps = {
  items: ItemsArray[];
  isLoading?: boolean;
};

const RecentlyItem = ({ items, isLoading }: RecentlyProps) => {
  const moveToStore = useCallback(() => {
    Router.push('/closet/store');
  }, []);
  const moveToDetailsPage = useCallback(
    (id: number) => () => {
      Router.push(`/closet/details/${id}`);
    },
    []
  );

  return (
    <LinkCardLayout Subject='Recently Eroll' Address='Store' onMove={moveToStore} divided={1}>
      <ListSection>
        <DescriptionSpan>가장 최근에 저장하신 의류 중 5가지를 보여줍니다</DescriptionSpan>
        <DescriptionDiv>클릭하시면 상세페이지로 이동합니다</DescriptionDiv>
        {items.map(item => {
          return <ListItem key={item.id} item={item} func={moveToDetailsPage} />;
        })}
      </ListSection>
    </LinkCardLayout>
  );
};

export default RecentlyItem;

export const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
`;

export const DescriptionSpan = styled.span`
  font-size: 12px;
  font-family: ${({ theme }) => theme.font.Efont};
  font-weight: ${({ theme }) => theme.fontWeight.Medium};
  margin-top: 5px;
`;

export const DescriptionDiv = styled(DescriptionSpan)`
  color: ${({ theme }) => theme.colors.middleGrey};
  margin-bottom: 5px;
`;
