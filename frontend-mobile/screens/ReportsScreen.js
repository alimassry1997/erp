import { Dimensions, StyleSheet, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Colors } from "../constants/styles";
import { BarChart, LineChart } from "react-native-chart-kit";

function ReportsScreen() {
  const authCtx = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [employeesList, setEmployeesList] = useState([]);
  const [report, setReport] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  /**
   * Get a single Report by SLug
   * @param email
   * @returns {Promise<void>}
   */
  const getReport = async (email) => {
    setLoadingReport(true);
    try {
      const response = await axios.get(
        `https://erp-lamp-api.herokuapp.com/api/reports/${email}`,
        {
          headers: { Authorization: `Bearer ${authCtx.token}` },
        }
      );
      const { data } = response;
      setReport(data);
    } catch (error) {
      console.log(error.message);
    }
    setLoadingReport(false);
  };

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

  const getReportOnSelect = (value) => {
    if (value) {
      const first_name = value.title.split(" ")[0];
      const email = employeesList.find(
        (employee) => employee.first_name === first_name
      ).email;
      getReport(email);
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
        onSelectItem={(item) => getReportOnSelect(item)}
        dataSet={dropdown}
      />
      <BarChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
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
