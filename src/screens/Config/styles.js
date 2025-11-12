import styled from 'styled-components/native';

export const BackGround = styled.View`
  flex: 1;
  background-color: #FFF9F2;
  align-items: center;
`;

export const LogoutText = styled.Text`
font-size: 18px;
font-weight: bold;
color: #FFFFFF;
`;

export const LogoutButton = styled.TouchableOpacity`
justify-content: center;
align-items: center;
margin-top: 10px;
width: 100%;
height: 45px;
border-width: 1px;
border-radius: 8px;
border-color: #FFFFFF;
background-color: #FF9C55;
`;

export const PanelContainer = styled.View`
  width: 90%;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 30px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 3px;
  shadow-radius: 4px;
`;

export const PanelTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #5D82FB;
  margin-bottom: 15px;
  text-align: center;
`;
export const AdminButton = styled.TouchableOpacity`
  background-color: #E6F0FF; /* Fundo azul claro */
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AdminButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #007AFF;
  margin-left: 10px;
`;