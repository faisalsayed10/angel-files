import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./util/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
