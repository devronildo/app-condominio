import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';
import WarningItem from '../../components/WarningItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Livro de Ocorrências',
            headerRight: () => (
                <s.AddButton
                    onPress={() => navigation.navigate('WarningAddScreen')}>
                    <Icon name="plus" size={24} color="#000" />
                </s.AddButton>
            ),
        });
        getWarnings();
    }, []);

    const getWarnings = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getWarnings();
        setLoading(false);
        if (result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    };

    return (
        <s.Container>
            {!loading && list.length === 0 && (
                <s.NoListArea>
                    <s.NoListText>Não há Ocorrências.</s.NoListText>
                </s.NoListArea>
            )}
            <s.List
                data={list}
                onRefresh={getWarnings}
                refreshing={loading}
                renderItem={({item}) => <WarningItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </s.Container>
    );
};
