import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';
import ReservationItem from '../../components/ReservationItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Reservas Disponíveis',
        });
        getReservations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getReservations = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getReservations();
        setLoading(false);
        if (result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    };

    return (
        <s.Container>
            <s.Scroller contentContainerStyle={{paddingBottom: 40}}>
                <s.ButtonArea onPress={null}>
                    <s.ButtonText>Minhas Reservas</s.ButtonText>
                </s.ButtonArea>
                <s.Title>Selecione uma Área</s.Title>

                {loading && <s.LoadingIcon size="large" color="#2d3251" />}

                {!loading && list.length === 0 && (
                    <s.NoListArea>
                        <s.NoListText>Não há áreas disponiveis</s.NoListText>
                    </s.NoListArea>
                )}

                {list.map((item, index) => (
                    <ReservationItem key={index} data={item} />
                ))}
            </s.Scroller>
        </s.Container>
    );
};
