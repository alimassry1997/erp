import Select from "react-select";
import makeAnimated from "react-select/animated";

const MultiSelect = ({
  id,
  options,
  loading,
  setSelectedOptions,
  defaultValue,
}) => {
  const animatedComponents = makeAnimated();
  return (
    <Select
      id={id}
      defaultValue={defaultValue}
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
