import logo from "./logo.svg";
import "./App.css";
import Routing from "./Components/Routing";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routing />
    </div>
  );
}

export default App;
