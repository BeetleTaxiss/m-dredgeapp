import { Route, Switch } from "react-router";
import { CountdownTimer } from "./components/countdownTimer/countdownTimer";
import FakeComponent from "./components/fakeComponent";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/loginPage.js";
import Pages from "./pages/pages";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/account" component={Pages} />
        <Route path="/production" component={Pages} />
        <Route path="/dashboard" component={Homepage} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
