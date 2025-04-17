import { StyleSheet } from "react-native"
import colors from "../../constants/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  inactiveTab: {
    fontSize: 16,
    paddingVertical: 8,
    color: "#666",
    borderBottomWidth: 2,
    borderColor: "#666",
  },

  activeTab: {
    fontSize: 16,
    paddingVertical: 8,
    color: "#000",
    borderBottomWidth: 2,
    borderColor: colors.highlightCyan,
  },

  eventList: {
    marginTop: 10,
  },

})

export default styles
