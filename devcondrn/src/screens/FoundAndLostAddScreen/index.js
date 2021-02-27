import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';
import {launchCamera} from 'react-native-image-picker';
import api from '../../services/api';
import DocItem from '../../components/DocItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [photo, setPhoto] = useState({});
    const [description, setDescription] = useState('');
    const [where, setWhere] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adicionar um Perdido',
        });
    }, []);

    const handleAddPhoto = () => {
        launchCamera(
            {
                mediaType: 'photo',
                maxWidth: 1280,
            },
            (response) => {
                if (!response.didCancel) {
                    setPhoto(response);
                }
            },
        );
    };

    const handleSave = async () => {
        if (description !== '' && where !== '' && photo.uri !== '') {
            const result = await api.AddLostItem(photo, description, where);
            if (result.error === '') {
                setPhoto({});
                setDescription('');
                setWhere('');
                navigation.navigate('FoundAndLostScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert('Preecha os campos');
        }
    };

    return (
        <s.Container>
            <s.Scroller>
                <s.PhotoArea>
                    {!photo.uri && (
                        <s.ButtonArea onPress={handleAddPhoto}>
                            <s.ButtonText>Tirar uma foto</s.ButtonText>
                        </s.ButtonArea>
                    )}
                    {photo.uri && (
                        <>
                            <s.PhotoItem
                                source={{uri: photo.uri}}
                                resizeMode="cover"
                            />
                            <s.ButtonArea onPress={handleAddPhoto}>
                                <s.ButtonText>Tirar outra foto</s.ButtonText>
                            </s.ButtonArea>
                        </>
                    )}
                </s.PhotoArea>
                <s.Title>Descreva o produto</s.Title>
                <s.Field
                    placeholder="Ex: Bolsa Preta da marca X"
                    value={description}
                    onChangeText={(t) => setDescription(t)}
                />

                <s.Title>Onde foi encotrado? </s.Title>
                <s.Field
                    placeholder="Ex: No pátio B"
                    value={where}
                    onChangeText={(t) => setWhere(t)}
                />
                <s.ButtonArea onPress={handleSave}>
                    <s.ButtonText>Salvar</s.ButtonText>
                </s.ButtonArea>
            </s.Scroller>
        </s.Container>
    );
};
