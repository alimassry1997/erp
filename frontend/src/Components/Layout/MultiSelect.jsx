import Select from "react-select";
import makeAnimated from "react-select/animated";

const MultiSelect = ({ options, loading, setSelectedOptions }) => {
  const animatedComponents = makeAnimated();
  return (
    <Select
      components={animatedComponents}
      isMulti
      onChange={(item) => setSelectedOptions(item)}
      options={options}
      isClearable
      isSearchable
      isLoading={loading}
      closeMenuOnSelect={false}
    />
  );
};

export default MultiSelect;
