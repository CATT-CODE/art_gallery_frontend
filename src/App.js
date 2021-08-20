import MainRouter from './MainRouter';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
      <MainRouter/>
      </Router>
    </div>
  );
}

export default App;
