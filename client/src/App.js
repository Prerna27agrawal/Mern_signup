import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import SignUp from './component/signup';
import WelcomePage from './component/welcomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path ="/">
          <SignUp />
        </Route>
        <Route path = "/welcome">
          <WelcomePage/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
