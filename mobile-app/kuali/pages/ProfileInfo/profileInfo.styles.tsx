import { StyleSheet } from "react-native"
import colors from "../../constants/colors"

const styles2 = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: 343,
    height: 587,
    alignItems: "flex-start",
    top: "20%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.highlightCyan,
    overflow: "hidden",
  },
  gradient: {
    height: 80,
    width: "100%",
  },
  info: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: "flex-start",
  },
  names: {
    fontSize: 20,
    fontFamily: "monserratSemiBold",
    marginBottom: 10,
    textAlign: "left",
    color: "#333",
  },
  value: {
    fontSize: 16,
    marginBottom: 6,
    color: "#555",
    textAlign: "left",
  },
  labelContainer: {
    marginBottom: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
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
})

export default styles2
