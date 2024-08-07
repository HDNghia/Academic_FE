import './App.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './component/Sidebar/Sidebar.js';
import StudyWord from './component/Work/StudyWord.js';
import Subject from './component/Work/Subject';
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
          return <Redirect to="/subject" />
        }}>
        </Route>
        <Switch>
          <Route path="/Home">
            <StudyWord />
          </Route>
          <Route path="/subject">
            <Subject />
          </Route>
          <Route path="/revise">
            <StudyWord />
          </Route>
          {/* <Route path="/listenning">
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
          </Route> */}
        </Switch>
      </div>
    </Router>

  );
}

export default App;
