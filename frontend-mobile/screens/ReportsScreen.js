import { StyleSheet, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Colors } from "../constants/styles";

function ReportsScreen() {
  const authCtx = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [employeesList, setEmployeesList] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  /**
   * Get all employees
   * @returns {Promise<void>}
   */
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const response = await axios.get(
        `https://erp-lamp-api.herokuapp.com/api/employees`,
        {
          headers: { Authorization: `Bearer ${authCtx.token}` },
        }
      );
      const {
        data: { employees },
      } = response;
      setEmployeesList(employees);
      setLoadingEmployees(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const dropdown = [];

  if (employeesList) {
    for (let i = 0; i < employeesList.length; i++) {
      dropdown.push({
        id: employeesList[i].id,
        title: `${employeesList[i].first_name} ${employeesList[i].last_name}`,
      });
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loadingEmployees) {
    return <LoadingOverlay message="Loading Employees" />;
  }
  return (
    <View>
      <AutocompleteDropdown
        containerStyle={styles.container}
        inputContainerStyle={styles.dropdown}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onSelectItem={setSelectedItem}
        dataSet={dropdown}
      />
    </View>
  );
}

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  dropdown: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
