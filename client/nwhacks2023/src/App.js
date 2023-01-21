import "./App.css";
import { signInWithGoogle } from "./firebase";

function App() {
  return (
    <div className="App">
      <Dashboard />
      <button onClick={signInWithGoogle}> Sign In With Google</button>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <h1>{localStorage.getItem("profilePic")}</h1>
    </div>
  );
}

export default App;
