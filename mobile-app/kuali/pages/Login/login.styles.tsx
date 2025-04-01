import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    imgContainer: {
        paddingTop: 50
    },
    titleContainer: {
        paddingBottom: 5
    },
    title: {
        fontFamily: 'monserratRegular', 
        textAlign: 'center', 
        fontSize: 24
    }, 
    inputsContainer: {
        display: 'flex', 
        gap: 10,
        padding: 30
    },
    inputLabels: {
        fontFamily: 'monserratRegular', 
        fontSize: 16 
    },
    inputText: {
        fontFamily: 'monserratRegular',
        fontSize: 16,
        backgroundColor: colors.solidWhite,
        borderRadius: 6,
        borderColor: colors.borderGray,
        height: 50,
        borderWidth: 1,
        padding: 10,
    }
})

export default styles;