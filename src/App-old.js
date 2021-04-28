import Users from "./components/users/users";

function App() {
  window.onclose = () => localStorage.clear();
  return (
    <div className="App">
      <Users/>
    </div>
  );
}

export default App;
