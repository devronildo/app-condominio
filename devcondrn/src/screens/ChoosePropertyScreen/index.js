import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkPropertySel = async () => {
            let property = await AsyncStorage.getItem('property');
            if (property) {
                property = JSON.parse(property);
                await chooseProperty(property);
            }
            setLoading(false);
        };
        checkPropertySel();
    }, []);

    const handleLogoutButton = async () => {
        await api.logout();
        navigation.reset({
            index: 1,
            routes: [{name: 'LoginScreen'}],
        });
    };

    const chooseProperty = async (property) => {
        await AsyncStorage.setItem('property', JSON.stringify(property));
        dispatch({
            type: 'setProperty',
            payload: {
                property,
            },
        });

        navigation.reset({
            index: 1,
            routes: [{name: 'MainDrawer'}],
        });
    };

    return (
        <s.Container>
            <s.Scroller>
                {loading && <s.LoadingIcon color="#8863e6" size="large" />}
                {!loading && context.user.user.properties.length > 0 && (
                    <>
                        <s.HeadTitle>Olá {context.user.user.name}</s.HeadTitle>
                        <s.HeadTitle>
                            Escolha uma das suas propriedades
                        </s.HeadTitle>
                        <s.PropertyList>
                            {context.user.user.properties.map((item, index) => (
                                <s.ButtonArea
                                    key={index}
                                    onPress={() => chooseProperty(item)}>
                                    <s.ButtonText>{item.name}</s.ButtonText>
                                </s.ButtonArea>
                            ))}
                        </s.PropertyList>
                    </>
                )}
                {!loading && context.user.user.properties.length <= 0 && (
                    <s.BigArea>
                        <s.HeadTitle>
                            {context.user.user.name}, Parabéns pelo cadastro!
                        </s.HeadTitle>
                        <s.HeadTitle>
                            Agora a administração precisa liberar seu acesso.
                        </s.HeadTitle>
                    </s.BigArea>
                )}
            </s.Scroller>
            <s.ExitButtonArea onPress={handleLogoutButton}>
                <s.ExitButtonText>Sair</s.ExitButtonText>
            </s.ExitButtonArea>
        </s.Container>
    );
};
