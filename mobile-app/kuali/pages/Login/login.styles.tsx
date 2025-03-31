import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    titleContainer: {
        padding: 30
    },
    title: {
        fontFamily: 'monserratRegular', 
        textAlign: 'center', 
        fontSize: 24
    }, 
    inputsContainer: {
        display: 'flex'
    },
    inputLabels: {
        fontFamily: 'monserratRegular', 
        textAlign: 'left', 
        fontSize: 16, 
    },
    inputText: {
        fontFamily: 'monserratRegular',
        fontSize: 16,
        backgroundColor: colors.solidWhite,
        borderRadius: 6,
        borderColor: colors.borderGray,
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    }
})

export default styles;