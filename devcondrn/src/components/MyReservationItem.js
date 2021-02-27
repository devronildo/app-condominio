import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import api from '../services/api';

const Box = styled.View`
    background-color: #fff;
    border-width: 2px;
    border-color: #e8e9ed;
    border-radius: 15px;
    margin-bottom: 15px;
    flex-direction: row;
    align-items: center;
`;
const CoverImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 15px;
`;

const InfoArea = styled.View`
    flex: 1;
    margin-left: 15px;
`;
const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-bottom: 5px;
`;
const InfoText = styled.Text`
    color: #9c9db9;
`;
const DateText = styled.Text`
    color: #000;
`;
const ButtonItem = styled.TouchableOpacity`
    margin: 20px;
`;

export default ({data, refreshFunction}) => {
    const handleRemoveButton = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja cancelar a reserva ?',
            [
                {text: 'Sim, tenho certeza', onPress: removeReservation},
                {text: 'Cancelar', onPress: null, style: 'cancel'},
            ],
        );
    };

    const removeReservation = async () => {
        const result = await api.removeReservation(data.id);
        if (result.error === '') {
            refreshFunction();
        } else {
            alert(result.error);
        }
    };

    return (
        <Box>
            <CoverImage source={{uri: data.cover}} resizeMode="cover" />
            <InfoArea>
                <Title>{data.title}</Title>
                <InfoText>Horário reservado: </InfoText>
                <DateText>{data.datereserved}</DateText>
            </InfoArea>
            <ButtonItem onPress={handleRemoveButton}>
                <Icon name="remove" size={25} color="#ff0000" />
            </ButtonItem>
        </Box>
    );
};
