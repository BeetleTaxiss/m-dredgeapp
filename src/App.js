import { Route, Switch } from "react-router";
import FakeComponent from "./components/fakeComponent";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/loginPage.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/test" component={FakeComponent} />
        <Route exact path="/dashboard" component={Homepage} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
