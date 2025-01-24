import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: width > 600 ? 32 : 16,
  },
  searchInput: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  pickerWrapper: {
    flex: 1,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    padding: 12,
    fontSize: 16,
    color: "#333",
    cursor: "pointer",
    height: 40,
  },
  pickerPlaceholder: {
    color: "#aaa",
    fontSize: 16,
  },
  pickerFocus: {
    borderColor: "#6200EE",
    shadowColor: "#6200EE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  searchButton: {
    backgroundColor: "#6200EE",
    color: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "column",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    width: width > 600 ? 100 : 60,
    height: width > 600 ? 100 : 60,
    borderRadius: 50,
    marginRight: 15,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  itemDetails: {
    marginTop: 8,
    paddingLeft: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  noResultsText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  favoriteButton: {
    marginLeft: "auto",
    padding: 8,
  },
});
