import './App.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './component/Sidebar/Sidebar';
import Android from './component/university/Android';
import Vocabulary from './component/Toeic/Vocabulary';
import Grammar from './component/Toeic/Grammar';
import Home from './component/Home';
import Olap from './component/university/Olap';
import Ptdlkd from './component/university/Ptdlkd';
import Qtclkd from './component/university/Qtclkd';
import Pldc from './component/university/Pldc';
import Listenning from './component/Toeic/Listenning';
import Reading from './component/Toeic/Reading';
import Reactjs from './component/Work/Reactjs';
import Nodejs from './component/Work/Nodejs';
import Sql from './component/Work/Sql';
import MongoDB from './component/Work/MongoDB';
import Firebase from './component/Work/Firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
function App() {

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Route path="/" exact render={() => {
          return <Redirect to="/Home" />
        }}>
        </Route>
        <Switch>
          <Route path="/Home">
            <Vocabulary />
          </Route>
          <Route path="/Vocabulary">
            <Vocabulary />
          </Route>
          <Route path="/grammar">
            <Grammar />
          </Route>
          <Route path="/listenning">
            <Listenning />
          </Route>
          <Route path="/reading">
            <Reading />
          </Route>
          <Route path="/Nodejs">
            <Nodejs />
          </Route>
          <Route path="/Sql">
            <Sql />
          </Route>
          <Route path="/MongoDB">
            <MongoDB />
          </Route>
          <Route path="/Firebase">
            <Firebase />
          </Route>
          <Route path="/Reactjs">
            <Reactjs />
          </Route>
          <Route path="/Android">
            <Android />
          </Route>
          <Route path="/olap">
            <Olap />
          </Route>
          <Route path="/Ptdlkd">
            <Ptdlkd />
          </Route>
          <Route path="/Qtclkd">
            <Qtclkd />
          </Route>
          <Route path="/Pldc">
            <Pldc />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
