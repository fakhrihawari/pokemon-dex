import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./components/Home";

import './App.css';
import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
