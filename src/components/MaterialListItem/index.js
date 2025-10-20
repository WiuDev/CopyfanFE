import React from 'react';
import {ItemContainer, HeaderArea, TitleText, DetailsGrid, DetailItem, DetailLabel, DetailValue, CourseTitleText} from './styles';

const MaterialListItem = ({item, onPress}) => {
  return (
    <ItemContainer onPress={onPress}>
      <HeaderArea>
        <TitleText>{item.name}</TitleText>
      </HeaderArea>
      <CourseTitleText numberOfLines={1}>{item.course.title}</CourseTitleText>
      <DetailsGrid>
        <DetailItem>
          <DetailLabel>Período</DetailLabel>
          <DetailValue>{item.classPeriod}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Total de Páginas</DetailLabel>
          <DetailValue>{item.total_pages}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>User:</DetailLabel>
          <DetailValue>{item.uploader ? item.uploader.name : 'Sistema'}</DetailValue>
        </DetailItem>
      </DetailsGrid>
    </ItemContainer>
  );
};
 
export default MaterialListItem;