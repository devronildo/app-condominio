import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';
import DocItem from '../../components/DocItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [docList, setDocList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Boletos',
        });
        getBillets();
    }, []);

    const getBillets = async () => {
        setDocList([]);
        setLoading(true);
        const result = await api.getBillets();
        setLoading(false);
        if (result.error === '') {
            setDocList(result.list);
        } else {
            alert(result.error);
        }
    };

    return (
        <s.Container>
            {!loading && docList.length === 0 && (
                <s.NoListArea>
                    <s.NoListText>Não há boletos desta unidade.</s.NoListText>
                </s.NoListArea>
            )}
            <s.List
                data={docList}
                onRefresh={getBillets}
                refreshing={loading}
                renderItem={({item}) => <DocItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </s.Container>
    );
};
