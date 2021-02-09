import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Fazer Cadastro',
        });
    }, []);

    const handleRegisterButton = async () => {
        if (name && email && cpf && password && passwordConfirm) {
            let result = await api.register(
                name,
                email,
                cpf,
                password,
                passwordConfirm,
            );
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
            alert('Preencha os campos.');
        }
    };

    return (
        <s.Container>
            <s.Field
                placeholder="Digite seu Nome Completo"
                value={name}
                onChangeText={(t) => setName(t)}
            />

            <s.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={(t) => setCpf(t)}
            />

            <s.Field
                placeholder="Digite seu E-mail"
                value={email}
                onChangeText={(t) => setEmail(t)}
            />
            <s.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={(t) => setPassword(t)}
            />
            <s.Field
                placeholder="Digite s ua Senha Novamente"
                secureTextEntry={true}
                value={passwordConfirm}
                onChangeText={(t) => setPasswordConfirm(t)}
            />

            <s.ButtonArea onPress={handleRegisterButton}>
                <s.ButtonText>CADASTRAR-SE</s.ButtonText>
            </s.ButtonArea>
        </s.Container>
    );
};
