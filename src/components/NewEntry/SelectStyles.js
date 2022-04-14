export const options_type = [
  { value: "Diamonds", label: "Diamonds" },
  { value: "Ruby", label: "Ruby" },
  { value: "Sapphire", label: "Sapphire" },
  { value: "Gem", label: "Gem" },
  { value: "YellowStone", label: "YellowStone" },
];

export const options_currency = [
  { value: "SGD", label: "SGD $" },
  { value: "USD", label: "USD $" },
  { value: "RMB", label: "RMB ¥" },
];

export const options_certificate = [
  { value: "GIA", label: "GIA" },
  { value: "AGS", label: "AGS" },
];
export const typeStyle = {
  option: (provided, state) => ({
    ...provided,

    color: state.isSelected ? "black" : "black",
    backgroundColor: state.isSelected ? "white" : "white",
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),

  placeholder: (provided) => ({
    ...provided,

    fontSize: "16px",
    letterSpacing: "0.46px",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "0",
    borderBottom: "1px solid black",
    borderColor: state.isFocused ? "0" : "0",
    "&:hover": {
      borderColor: "black",
    },
    borderRadius: "0",
    boxShadow: "none",
  }),

  indicatorsContainer: (provided) => ({
    display: "none",
  }),
};
export const currencyStyle = {
  option: (provided, state) => ({
    ...provided,

    color: state.isSelected ? "black" : "black",
    backgroundColor: state.isSelected ? "white" : "white",
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    alignItems: "flex-end",
  }),

  container: () => ({
    width: "20vw",
    margin: 0,
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
    letterSpacing: "0.46px",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "0",
    borderBottom: "1px solid black",
    borderColor: state.isFocused ? "0" : "0",
    "&:hover": {
      borderColor: "black",
    },
    borderRadius: "0",
    boxShadow: "none",
  }),

  input: (provided) => ({
    ...provided,
    margin: "30px 5px 0 0",
  }),
  indicatorsContainer: (provided) => ({
    display: "none",
  }),
};

export const certificateStyle = {
  option: (provided, state) => ({
    ...provided,

    color: state.isSelected ? "black" : "black",
    backgroundColor: state.isSelected ? "white" : "white",
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
    letterSpacing: "0.46px",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "0",
    borderBottom: "1px solid black",
    borderColor: state.isFocused ? "0" : "0",
    "&:hover": {
      borderColor: "black",
    },
    borderRadius: "0",
    boxShadow: "none",
  }),

  indicatorsContainer: (provided) => ({
    display: "none",
  }),
};
