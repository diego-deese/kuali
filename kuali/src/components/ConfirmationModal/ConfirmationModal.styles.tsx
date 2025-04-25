import { StyleSheet } from "react-native";
import colors from "../../constants/colors"

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.backgroundWhite,
    padding: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "90%",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  description: {
    fontSize: 14,
    color: colors.fontBlack,
    textAlign: "left",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.placeholderGray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  confirmButton: {
    backgroundColor: colors.blueIcons,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelText: {
    color: colors.fontBlack,
    fontWeight: "bold",
  },
  confirmText: {
    color: colors.solidWhite,
    fontWeight: "bold",
  },
});
