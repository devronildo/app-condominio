import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';
import WallItem from '../../components/WallItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [wallList, setWallList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Mural de avisos',
        });
        getWall();
    }, []);

    const getWall = async () => {
        setWallList([]);
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);
        if (result.error === '') {
            setWallList(result.list);
        } else {
            alert(result.error);
        }
    };

    return (
        <s.Container>
            {!loading && wallList.length === 0 && (
                <s.NoListArea>
                    <s.NoListText>Não há avisos.</s.NoListText>
                </s.NoListArea>
            )}
            <s.List
                data={wallList}
                onRefresh={getWall}
                refreshing={loading}
                renderItem={({item}) => <WallItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </s.Container>
    );
};
