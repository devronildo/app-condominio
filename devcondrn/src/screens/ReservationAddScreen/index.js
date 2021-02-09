import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';

import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(false);
    const [disabledDates, setDisabledDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Reservar ${route.params.data.title}`,
            });
            getDisabledDates();
        });
        return unsubscribe;
    }, [navigation, route]);

    let minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    const getDisabledDates = async () => {
        setDisabledDates([]);
        setTimeList([]);
        setSelectedDate(null);
        setSelectedTime(null);
        setLoading(true);
        const result = await api.getDisabledDates(route.params.data.id);
        setLoading(false);
        if (result.error === '') {
            let dateList = [];
            for (let i in result.list) {
                dateList.push(new Date(result.list[i]));
            }

            setDisabledDates(dateList);
        } else {
            alert(result.error);
        }
    };

    const handleDateChange = () => {};

    return (
        <s.Container>
            <s.Scroller contentContainerStyle={{paddingBottom: 40}}>
                <s.CoverImage
                    source={{uri: route.params.data.cover}}
                    resizeMode="cover"
                />

                {loading && <s.LoadingIcon size="large" color="#2d3251" />}

                {!loading && (
                    <s.CalendarArea>
                        <CalendarPicker
                            onDateChange={handleDateChange}
                            disabledDates={disabledDates}
                            minDate={minDate}
                            maxDate={maxDate}
                            weekdays={[
                                'Dom',
                                'Seg',
                                'Ter',
                                'Qua',
                                'Qui',
                                'Sex',
                                'Sáb',
                            ]}
                            months={[
                                'Janeiro',
                                'Fevereiro',
                                'Março',
                                'Abril',
                                'Maio',
                                'Junho',
                                'Julho',
                                'Agosto',
                                'Setembro',
                                'Outubro',
                                'Novembro',
                                'Dezembro',
                            ]}
                            previousTitle="Anterior"
                            nextTitle="Próximo"
                            selectedDayColor="#2d3251"
                            selectedDayTextColor="#fff"
                            todayBackgroundColor="transparent"
                            todayTextStyle="#000"
                            startFromMonday={true}
                        />
                    </s.CalendarArea>
                )}
            </s.Scroller>
        </s.Container>
    );
};
