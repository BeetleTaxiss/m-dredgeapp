import { Route, Switch } from "react-router";
import Homepage from "./pages/home-page";
import LoginPage from "./pages/login-page.js";
import Pages from "./pages/pages";

function App() {
  window.onclose = () => localStorage.clear();
  return (
    <div className="App">
      <Switch>
        <Route path="/singlerevenuereport" component={Pages} />
        <Route path="/revenuereport" component={Pages} />
        <Route path="/singleexpensereport" component={Pages} />
        <Route path="/expensereport" component={Pages} />
        <Route path="/postexpense" component={Pages} />
        <Route path="/products" component={Pages} />
        <Route path="/users" component={Pages} />
        <Route path="/loader" component={Pages} />
        <Route path="/inspect" component={Pages} />
        <Route path="/security" component={Pages} />
        <Route path="/dispatchlist" component={Pages} />
        <Route path="/orderreceipt" component={Pages} />
        <Route path="/placeorder" component={Pages} />
        <Route path="/vieworders" component={Pages} />
        <Route path="/production" component={Pages} />
        <Route path="/productionlist" component={Pages} />
        <Route path="/wetsand" component={Pages} />
        <Route path="/stockpile" component={Pages} />
        <Route path="/stock" component={Pages} />
        <Route path="/stockupdate" component={Pages} />
        <Route path="/profile" component={Pages} />
        <Route path="/dashboard" component={Homepage} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
