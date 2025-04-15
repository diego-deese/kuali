import { StyleSheet } from "react-native";
import colors from "../../constants/colors"

const styles = StyleSheet.create({
  card: {
    width: 380,            // Más ancho
    height: 600,
    //backgroundColor: "white",
    //borderRadius: 10,
    padding: 20,
    marginRight: 16,
    //elevation: 3,
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
  },
  
  image: {
    width: "100%",
    height: "100%",
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
    fontSize: 25,
  },
});

export default styles;

