/* sublist of items taken from item capture*/

export const options_type = [
  { value: "AMBER", label: "AMBER" },
  { value: "AMETHYST", label: "AMETHYST" },
  { value: "AMETRINE", label: "AMETRINE" },
  { value: "APATITE", label: "APATITE" },
  { value: "ALEXANDRITE", label: "ALEXANDRITE" },
  { value: "AQUAMARINE", label: "AQUAMARINE" },
  { value: "HELIODOR", label: "HELIODOR" },
  { value: "BERYL", label: "BERYL" },
  { value: "CHRYSOBERYL ", label: "CHRYSOBERYL " },
  { value: "CHROME DIOPSIDE ", label: "CHROME DIOPSIDE " },
  { value: "CHROME TOURMALINE ", label: "CHROME TOURMALINE " },

  { value: "CITRINE", label: "CITRINE" },
  { value: "EMERALD", label: "EMERALD" },
  { value: "GARNET - ALMANDINE", label: "GARNET - ALMANDINE" },
  { value: "GARNET - DEMANTOID", label: "GARNET - DEMANTOID" },
  { value: "GARNET- GROSSULAR", label: "GARNET- GROSSULAR" },
  { value: "GARNET – PYROPE", label: "GARNET – PYROPE" },
  { value: "GARNET – RHODOLITE", label: "GARNET – RHODOLITE" },
  { value: "GARNET - SPESSARTINE", label: "GARNET - SPESSARTINE" },
  {
    value: "GARNET - SPESSARTINE-MANDARIN",
    label: "GARNET - SPESSARTINE-MANDARIN",
  },
  { value: "GARNET – TSAVORITE", label: "GARNET – TSAVORITE" },
  { value: "IMPERIAL TOPAZ", label: "IMPERIAL TOPAZ" },
  { value: "IOLITE", label: "IOLITE" },
  { value: "INDICOLITE", label: "INDICOLITE" },
  { value: "JADEITE", label: "JADEITE" },
];

export const options_currency = [
  { value: "SGD", label: "SGD $" },
  { value: "USD", label: "USD $" },
  { value: "RMB", label: "RMB ¥" },
];

export const options_certificate = [
  { value: "GIA", label: "GIA" },
  { value: "AGL (USA)", label: "AGL (USA)" },
  { value: "AIG (International)", label: "AIG (International)" },
  { value: "AIGS (Thailand)", label: "AIGS (Thailand)" },
  { value: "CGL (Japan)", label: "CGL (Japan)" },
  { value: "CISGEM (Italy)", label: "CISGEM (Italy)" },
  { value: "DSEF (Germany)", label: "DSEF (Germany)" },
  { value: "GGTL (Sri Lanka)", label: "GGTL (Sri Lanka)" },
  { value: "GIC (Sri Lanka)", label: "GIC (Sri Lanka)" },
  { value: "GIT-Gem (Thailand)", label: "GIT-Gem (Thailand)" },
  { value: "FGA (UK)", label: "FGA (UK)" },
  { value: "GIA (International)", label: "GIA (International)" },
  { value: "Gübelin (Switzerland)", label: "Gübelin (Switzerland)" },
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
