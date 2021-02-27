/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';
import LostItem from '../../components/LostItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [lostList, setLostList] = useState([]);
    const [recoveredList, setRecoveredList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Achados e Perdidos',
            headerRight: () => (
                <s.AddButton onPress={handleAddItem}>
                     <Icon name="plus" size={24} color="#000" />
                </s.AddButton>
            ),
        });
        getFoundAndLost();
    }, []);

    useEffect(() => {
           const unsubscribe = navigation.addListener('focus', () => {
                getFoundAndLost();
           });
           return unsubscribe;
    }, [navigation]);

    const handleAddItem = () => {
         navigation.navigate('FoundAndLostAddScreen');
    };

    const getFoundAndLost = async () => {
        setLostList([]);
        setRecoveredList([]);
        setLoading(true);
        const result = await api.getFoundAndLost();
        setLoading(false);
        if (result.error === '') {
            setLostList(result.lost);
            setRecoveredList(result.recovered);
        } else {
            alert(result.error);
        }
    };

    return (
        <s.Container>
             <s.Scroller >
            {loading && <s.LoadingIcon color="#2d3251" size="large" />}
            {!loading && lostList.length === 0 && recoveredList.length === 0 &&
                <s.NoListArea>
                    <s.NoListText>
                        Não há itens perdidos/recuperados.
                    </s.NoListText>
                </s.NoListArea>
            }

              {!loading && lostList.length > 0 &&
                  <>
                       <s.Title>Itens Perdidos</s.Title>
                       <s.ProductScroller
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                        >
                            {lostList.map((item, index) => (
                               <LostItem
                                  key={index}
                                  data={item}
                                  showButton={true}
                                  refreshFunction={getFoundAndLost}
                               />
                            ))}
                       </s.ProductScroller>
                  </>
              }

                {!loading && recoveredList.length > 0 &&
                  <>
                       <s.Title>Itens Recuperados</s.Title>
                       <s.ProductScroller
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                        >
                            {recoveredList.map((item, index) => (
                               <LostItem
                                  key={index}
                                  data={item}
                                  showButton={false}
                               />
                            ))}
                       </s.ProductScroller>
                  </>
              }

            </s.Scroller>
        </s.Container>
    );
};
