import './App.css';
import MyRoutes from "./Components/routes";
import Navbar from "./Components/Navbar";
import styled from "@emotion/styled";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

const AppContainer = styled.div`
  //text-align: center;
  margin: 2em auto;
  max-width: 500px;
  height: 900px;
  background-color: white;
`;
const queryClient = new QueryClient({ defaultOptions: { queries: { cacheTime: 0 }}});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <Navbar/>
        <MyRoutes/>
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
