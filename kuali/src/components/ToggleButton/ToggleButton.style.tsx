import { StyleSheet } from "react-native";
import colors from "../../constants/colors"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.solidWhite,
    padding: 4,
    
    borderRadius: 15,
    alignSelf: "flex-end",
    marginRight: 35,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  option: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  active: {
    backgroundColor: colors.highlightCyan,
  },
  text: {
    fontSize: 14,
    color: colors.fontBlack,
  },
  activeText: {
    color: colors.solidWhite,
    fontWeight: "bold",
  },
});

export default styles;
