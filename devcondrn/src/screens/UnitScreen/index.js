import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';
import api from '../../services/api';

import UnitPeopleSection from '../../components/UnitPeopleSection';
import UnitVehicleSection from '../../components/UnitVehicleSection';
import UnitPetSection from '../../components/UnitPetSection';

import UnitModalAddPerson from '../../components/UnitModalAddPerson';
import UnitModalAddPet from '../../components/UnitModalAddPet';
import UnitModalAddVehicle from '../../components/UnitModalAddVehicle';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [peopleList, setPeopleList] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [petList, setPetList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `Dados da unidade (${context.user.property.name})`,
        });
        getUnitInfo();
    }, []);

    const getUnitInfo = async () => {
        setLoading(true);
        const result = await api.getUnitInfo();
        setLoading(false);
        if (result.error === '') {
            setPeopleList(result.people);
            setVehicleList(result.vehicles);
            setPetList(result.pets);
        } else {
            alert(result.error);
        }
    };

    const handleAdd = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    return (
        <s.Container>
            <s.Scroller>
                {loading && <s.LoadingIcon color="#2d3251" size="large" />}
                {!loading && (
                    <>
                        <s.TitleArea>
                            <s.Title>Moradores</s.Title>
                            <s.TitleAddButton
                                onPress={() => handleAdd('person')}>
                                <Icon name="plus" size={24} color="#000" />
                            </s.TitleAddButton>
                        </s.TitleArea>
                        <s.ListArea>
                            <UnitPeopleSection
                                list={peopleList}
                                refreshFunction={getUnitInfo}
                            />
                        </s.ListArea>

                        <s.TitleArea>
                            <s.Title>Pets</s.Title>
                            <s.TitleAddButton onPress={() => handleAdd('pet')}>
                                <Icon name="plus" size={24} color="#000" />
                            </s.TitleAddButton>
                        </s.TitleArea>
                        <s.ListArea>
                            <UnitPetSection
                                list={petList}
                                refreshFunction={getUnitInfo}
                            />
                        </s.ListArea>
                        <s.TitleArea>
                            <s.Title>Veiculos</s.Title>
                            <s.TitleAddButton
                                onPress={() => handleAdd('vehicle')}>
                                <Icon name="plus" size={24} color="#000" />
                            </s.TitleAddButton>
                        </s.TitleArea>
                        <s.ListArea>
                            <UnitVehicleSection
                                list={vehicleList}
                                refreshFunction={getUnitInfo}
                            />
                        </s.ListArea>
                    </>
                )}
            </s.Scroller>

            <s.ModalArea
                visible={showModal}
                transparent={true}
                animationType="slide">
                <s.ModalBg>
                    <s.ModalBody>
                        {modalType === 'person' && (
                            <UnitModalAddPerson
                                refreshFunction={getUnitInfo}
                                setShowModal={setShowModal}
                            />
                        )}
                        {modalType === 'pet' && (
                            <UnitModalAddPet
                                refreshFunction={getUnitInfo}
                                setShowModal={setShowModal}
                            />
                        )}
                        {modalType === 'vehicle' && (
                            <UnitModalAddVehicle
                                refreshFunction={getUnitInfo}
                                setShowModal={setShowModal}
                            />
                        )}
                    </s.ModalBody>
                </s.ModalBg>
            </s.ModalArea>
        </s.Container>
    );
};
