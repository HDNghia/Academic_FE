import './App.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './component/Sidebar/Sidebar.js';
import Ktdl from './component/university/Ktdl.js';
import Vocabulary from './component/Toeic/Vocabulary.js';
import Grammar from './component/Toeic/Grammar.js';
import Dtdm from './component/university/Dtdm.js';
import Hdnldn from './component/university/Hdnldn.js';
import Atvbmtt from './component/university/Atvbmtt.js';
import Listenning from './component/Toeic/Listenning.js';
import Reading from './component/Toeic/Reading.js';
import Reactjs from './component/Work/Reactjs';
import Nodejs from './component/Work/Nodejs';
import Sql from './component/Work/Sql';
import MongoDB from './component/Work/MongoDB';
import Firebase from './component/Work/Firebase';
import Writting from './component/Toeic/Writting';
import Speaking from './component/Toeic/Speaking';
import Php from './component/Work/Php';
import Github from './component/Work/Github';
import Laravel from './component/Work/Laravel';
import Oop from './component/Work/Oop';
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
          <Route path="/Ktdl">
            <Ktdl />
          </Route>
          <Route path="/Dtdm">
            <Dtdm />
          </Route>
          <Route path="/Hdnldn">
            <Hdnldn />
          </Route>
          <Route path="/Atvbmtt">
            <Atvbmtt />
          </Route>
          <Route path="/Writting">
            <Writting />
          </Route>
          <Route path="/Speaking">
            <Speaking />
          </Route>
          <Route path="/Php">
            <Php />
          </Route>
          <Route path="/Github">
            <Github />
          </Route>
          <Route path="/Oop">
            <Oop />
          </Route>
          <Route path="/Laravel">
            <Laravel />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
