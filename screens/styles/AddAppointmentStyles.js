import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../themes/";

export default StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "column",
    backgroundColor: 'rgb(244, 244, 244)',
  },
  contentContainerStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
  },
  input: {
    minWidth: 220,
    height: 40,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.charcoal

  },
  button: {
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.lighterMatBlue,
    marginBottom: 40,
    marginTop: 20,
    height: 40
  },
  textArea: {
    minWidth: 220,
    height: 140,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.charcoal

  },
  inputCol: {
    flexDirection: 'column'
  },
  error: {
    color: Colors.pastelRed,
    fontSize: 12,
    fontWeight: "400",
    paddingBottom: 10
    }
});
