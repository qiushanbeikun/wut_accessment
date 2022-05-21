import './App.css';
import MyRoutes from "./Components/routes";
import styled from "@emotion/styled";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import Navbar from "./Components/Navbar";
import {BrowserRouter} from "react-router-dom";

const AppContainer = styled(Container)(({theme}) => `
  ${theme.breakpoints.up('sm')} {
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
  height: 100%;
  overflow: auto;
  background-color: white;
`);

const muiTheme = createTheme()

const queryClient = new QueryClient({defaultOptions: {queries: {cacheTime: 0}}});

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContainer maxWidth="xs" disableGutters>
            <Navbar/>
            <MyRoutes/>
          </AppContainer>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
