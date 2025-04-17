import { StyleSheet } from "react-native";
import colors from "../../constants/colors"

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: 380,
    height: 600,
    padding: 15,
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
    left: 20,
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 30,
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
    marginLeft: 6,
    fontSize: 23,
  },
  icon: {
    width: 20,
    textAlign: "center",
  },
  controls: {
    marginTop: -300,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  
});

export default styles;

