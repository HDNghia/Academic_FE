import './App.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './component/Sidebar/Sidebar.js';
import Android from './component/university/Android.js';
import Vocabulary from './component/Toeic/Vocabulary.js';
import Grammar from './component/Toeic/Grammar.js';
import Olap from './component/university/Olap.js';
import Ptdlkd from './component/university/Ptdlkd.js';
import Sales from './component/university/sales.js';
import Pldc from './component/university/Pldc.js';
import Listenning from './component/Toeic/Listenning.js';
import Reading from './component/Toeic/Reading.js';
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
          <Route path="/Sales">
            <Sales />
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
