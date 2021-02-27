/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera} from 'react-native-image-picker';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [warnText, setWarnText] = useState('');
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adicionar uma Ocorrência',
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddPhoto = async () => {
        launchCamera(
            {
                mediaType: 'photo',
                maxWidth: 1280,
            },
            async (response) => {
                if (!response.didCancel) {
                    setLoading(true);
                    let result = await api.addWarningFile(response);
                    setLoading(false);
                    if (result.error === '') {
                        let list = [...photoList];
                        list.push(result.photo);
                        setPhotoList(list);
                    } else {
                        alert(result.error);
                    }
                }
            },
        );
    };

    const handleDelPhoto = (url) => {
        let list = [...photoList];
         list = list.filter(value=>value !== url);
        setPhotoList(list);
    }

    const handleSaveWarn = async () => {
         if (warnText !== ''){
               const result = await api.addWarning(warnText, photoList);
               if (result.error === ''){
                  navigation.navigate('WarningScreen');
               } else {
                    alert(result.error)
               }
         } else {
              alert('Descreva a ocorrência');
         }
    }

    return (
        <s.Container>
            <s.Scroller>
                <s.Title>Descreva a Ocorrência</s.Title>
                <s.Field
                    placeholder="Ex: Vizinho X está com o som alto."
                    value={warnText}
                    onChangeText={(t) => setWarnText(t)}
                />
                <s.Title>Fotos relacionadas</s.Title>
                <s.PhotoArea>
                    <s.PhotoScroll horizontal={true}>
                        <s.PhotoAddButton onPress={handleAddPhoto}>
                            <Icon name="camera" size={24} color="#000" />
                        </s.PhotoAddButton>
                        {photoList.map((item, index) => (
                            <s.PhotoItem key={index}>
                                <s.Photo source={{uri: item}} />
                                <s.PhotoRemoveButton onPress={() => handleDelPhoto(item)}>
                                    <Icon
                                        name="remove"
                                        size={16}
                                        color="#ff0000"
                                    />
                                </s.PhotoRemoveButton>
                            </s.PhotoItem>
                        ))}
                    </s.PhotoScroll>
                </s.PhotoArea>
                {loading &&
                    <s.LoadingText>Enviando Foto. Aguarde.</s.LoadingText>
                }

                <s.ButtonArea onPress={handleSaveWarn}>
                    <s.ButtonText>Salvar</s.ButtonText>
                </s.ButtonArea>
            </s.Scroller>
        </s.Container>
    );
};
