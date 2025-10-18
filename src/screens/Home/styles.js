import styled from 'styled-components/native';

export const BackGround = styled.View`
  flex: 1;
  background-color: #FFF9F2;
`;

export const ContentArea = styled.ScrollView`
  padding: 15px;
`;

export const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
    align-self: center;
`;

export const QuickNavArea = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0;
`;

export const LoadingArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;