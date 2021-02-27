/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef} from 'react';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import s from './style';
import {useStateValue} from '../../contexts/stateContext';
import api from '../../services/api';

export default () => {
    const scroll = useRef();
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
           getTimes();
    }, [selectedDate]);




    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    const getTimes = async () => {
               if (selectedDate){
                    const result = await api.getReservationTimes(
                        route.params.data.id,
                        selectedDate
                    );
                    if (result.error === ''){
                        setSelectedTime(null);
                        setTimeList(result.list);
                        setTimeout(() => {
                              scroll.current.scrollToEnd();
                        }, 500);
                    } else {
                         alert(result.error);
                    }
               }
    };




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

                //.setHours() + 3
              dateList.push(moment(new Date((result.list[i]))).add(3, 'hours'));
            }

            setDisabledDates(dateList);
        } else {
            alert(result.error);
        }
    };
    const handleDateChange = (date) => {
         let dateEl =  new Date(date);
         let year = dateEl.getFullYear();
         let month = dateEl.getMonth() + 1;
         let day = dateEl.getDate();

         month = month < 10 ? '0'+month : month;
         day = day < 10 ? '0'+day : day;
         setSelectedDate(`${year}-${month}-${day}`);
    };

    const showTextDate = (date) => {
        let dateEl =  new Date(date);
        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate() + 1;



        // eslint-disable-next-line space-infix-ops
        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;

        return `${day}/${month}/${year}`;
    };

    const handleSave = async () => {
         if (selectedDate && selectedTime){
             const result = await api.setReservation(
                 route.params.data.id,
                 selectedDate,
                 selectedTime
             );
             if (result.error === ''){
                  navigation.navigate('ReservationMyScreen');
             } else {
                  alert(result.error);
             }
            } else {
                alert('Selecione DATA e HORÁRIO.');
         }

    };

    return (
        <s.Container>
            <s.Scroller ref={scroll} contentContainerStyle={{paddingBottom: 40}}>
                <s.CoverImage
                    source={{uri: route.params.data.cover}}
                    resizeMode="cover"
                />
                {loading && <s.LoadingIcon size="large" color="#2d3251" />}
                {!loading &&
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


                        />
                    </s.CalendarArea>
                }
                {!loading && selectedDate &&
                    <>
                        <s.Title>Horários disponiveis em {showTextDate(selectedDate)}: </s.Title>
                        <s.TimeListArea>
                            {timeList.map((item, index) => (
                                 <s.TimeItem

                                  key={index} onPress={() => setSelectedTime(item.id)}
                                   active={selectedTime === item.id}
                                  >
                                        <s.TimeItemText
                                         active={selectedTime === item.id}
                                        >{item.title}</s.TimeItemText>
                                 </s.TimeItem>
                            ))}
                        </s.TimeListArea>
                    </>
                }
            </s.Scroller>
            {!loading &&
               <s.ButtonArea onPress={handleSave}>
                    <s.ButtonText>Reservar Local</s.ButtonText>
               </s.ButtonArea>
            }
        </s.Container>
    );
};
