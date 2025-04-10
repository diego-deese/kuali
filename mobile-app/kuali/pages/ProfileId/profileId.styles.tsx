import { StyleSheet, Dimensions } from "react-native"
import colors from "../../constants/colors"
import Constants from "expo-constants"

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  // Estilos generales
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    top: "10%",
  },
  card: {
    width: width * 0.8,
    height: height * 0.6,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.highlightCyan,
    overflow: "hidden",
    alignSelf: "center",
  },

  // Estilos para la parte frontal
  gradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: colors.highlightCyan,
    position: "absolute",
    top: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  info: {
    alignItems: "center",
    marginTop: height * 0.3,
    width: "100%",
  },
  names: {
    fontFamily: "monserratSemiBold",
    fontWeight: "bold",
    fontSize: 32,
  },
  identifier: {
    color: "white",
    backgroundColor: colors.highlightCyan,
    marginTop: 20,
    fontFamily: "monserratRegular",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
  },
  role: {
    fontFamily: "monserratSemiBold",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  program: {
    fontFamily: "monserratRegular",
    fontSize: 20,
    marginTop: 10,
  },

  // Estilos para parte trasera
  backInfo: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: "flex-start",
    width: "100%",
  },
  labelContainer: {
    marginBottom: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    width: "100%",
  },
  label: {
    backgroundColor: colors.highlightCyan,
    color: colors.solidWhite,
    fontFamily: "monserratSemiBold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 6,
    color: "#555",
    textAlign: "left",
  },

  // Navegación
  navigationDots: {
    flexDirection: "row",
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.highlightCyan,
    marginHorizontal: 5,
  },
  inactiveCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 5,
  },

  // Contenedor para FlipCard
  flipCardContainer: {
    paddingTop: Constants.statusBarHeight,
    width: width * 0.8,
    height: height * 0.65,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
})

export default styles
