import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./components/Home";

import './App.css';
import Detail from "./components/Detail";
// import Other from "./components/Other";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          {/* <Route path="/other" element={<Other/>}></Route> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
