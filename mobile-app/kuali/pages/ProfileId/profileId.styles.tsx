import { StyleSheet } from "react-native"
import colors from "../../constants/colors"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: 343,
    height: 587,
    alignItems: "center",
    top: "20%",
    // left: "50%",
    // right: "50%",
    // justifyContent: "flex-start",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.highlightCyan,
    overflow: "hidden",
  },
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
    marginTop: "70%",
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
  navigationDots: {
    flexDirection: "row",
    position: "absolute",
    bottom: "-25%",
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
})

export default styles
