import { StyleSheet, Dimensions } from "react-native"
import colors from "../../constants/colors"

// Obtener las dimensiones para calcular valores base
const { width } = Dimensions.get("window")
const baseWidth = width * 0.85

const styles = StyleSheet.create({
  // Estilos generales
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.highlightCyan,
    overflow: "hidden",
    backgroundColor: "white",
  },

  // Estilos para la parte frontal
  gradient: {
    position: "absolute",
    top: 0,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: colors.highlightCyan,
    position: "absolute",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
  },
  info: {
    alignItems: "center",
    width: "90%",
  },
  names: {
    fontFamily: "monserratSemiBold",
    fontWeight: "bold",
    textAlign: "center",
  },
  identifier: {
    color: "white",
    backgroundColor: colors.highlightCyan,
    fontFamily: "monserratRegular",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  role: {
    fontFamily: "monserratSemiBold",
    fontWeight: "bold",
    textAlign: "center",
  },
  program: {
    fontFamily: "monserratRegular",
    textAlign: "center",
  },

  // Estilos para parte trasera
  backInfo: {
    paddingHorizontal: 0,
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "space-around",
    flex: 1,
  },
  labelContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 10,
  },
  label: {
    backgroundColor: colors.highlightCyan,
    color: colors.solidWhite,
    fontFamily: "monserratSemiBold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 5,
  },
  value: {
    marginBottom: 6,
    color: "#555",
    textAlign: "left",
  },

  // Navegación
  navigationDots: {
    flexDirection: "row",
    marginTop: 20,
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
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
})

export default styles
