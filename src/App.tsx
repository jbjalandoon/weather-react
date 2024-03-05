import "./App.css";
import Header from "./components/Header";
import Content from "./components/content/Content";
import CountryContextProvider from "./context/CountryContext";

function App() {
  return (
    <CountryContextProvider>
      <Header />
      <Content />
    </CountryContextProvider>
  );
}

export default App;
