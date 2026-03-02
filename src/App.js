import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Title from "./components/title";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.background,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Title />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
