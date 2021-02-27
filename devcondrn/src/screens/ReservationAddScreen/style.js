import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #f5f6fa;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
    `,
    CoverImage: styled.Image`
        height: 150px;
    `,
    LoadingIcon: styled.ActivityIndicator`
        margin-top: 20px;
    `,
    CalendarArea: styled.View`
        margin: 20px;
    `,
    Title: styled.Text`
        color: #000;
        font-size: 17px;
        font-weight: bold;
        margin: 10px 20px;
    `,
    TimeListArea: styled.View`
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 30px;
    `,
    TimeItem: styled.TouchableOpacity`
        border-width: 1px;
        border-color: #ccc;
        border-radius: 5px;
        margin: 5px 20px;
        background-color: ${(props) =>
            props.active ? '#2d3251' : 'transparent'};
        padding: 10px;
    `,
    TimeItemText: styled.Text`
        color: ${(props) => (props.active ? '#fff' : '#000')};
        font-size: 14px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #2d3251;
        padding: 15px;
        justify-content: center;
        align-items: center;
    `,
    ButtonText: styled.Text`
        color: #fff;
        font-size: 15px;
        font-weight: bold;
    `,
};
