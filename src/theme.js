import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const CustomTheme = {
  ...theme,
  fonts: {
    heading: '"Fantasy", "sans-serif"',
    body: '"Monda", "sans-serif"',
    mono: '"Monda", "sans-serif"',
  },
};

export default CustomTheme;