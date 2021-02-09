import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButton = async () => {
        if (cpf && password) {
            let result = await api.login(cpf, password);
            if (result.error === '') {
                dispatch({
                    type: 'setToken',
                    payload: {
                        token: result.token,
                    },
                });
                dispatch({
                    type: 'setUser',
                    payload: {
                        user: result.user,
                    },
                });

                navigation.reset({
                    index: 1,
                    routes: [{name: 'ChoosePropertyScreen'}],
                });
            } else {
                alert(result.error);
            }
        } else {
            alert('Preencha os campos');
        }
    };

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <s.Container>
            <s.Logo
                source={require('../../assets/home3.png')}
                resizeMode="contain"
            />
            <s.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={(t) => setCpf(t)}
            />
            <s.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={(t) => setPassword(t)}
            />

            <s.ButtonArea onPress={handleLoginButton}>
                <s.ButtonText>ENTRAR</s.ButtonText>
            </s.ButtonArea>

            <s.ButtonArea onPress={handleRegisterButton}>
                <s.ButtonText>CADASTRAR-SE</s.ButtonText>
            </s.ButtonArea>
        </s.Container>
    );
};
