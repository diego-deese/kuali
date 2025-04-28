import { StyleSheet } from "react-native";
import colors from "../../constants/colors"
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "85%",
    height: "93%",
    padding: 10,
  }, 
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: RFValue(25),
    fontWeight: "bold",
    color: colors.solidWhite,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  text: {
    color: colors.solidWhite,
    marginLeft: 3,
    fontSize: RFValue(18),
  },
  icon: {
    width: 20,
    textAlign: "center",
  },
  controls: {
    marginTop: -200,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  
});

export default styles;

