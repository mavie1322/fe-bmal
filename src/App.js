import { UserContext } from "./context/user";
import { useContext } from "react";
import { AuthApp } from "./components/AuthApp";
import { LogIn } from "./components/LogIn";

function App() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  return loggedInUser.auth ? (
    <AuthApp className='app' />
  ) : (
    <LogIn setLoggedInUser={setLoggedInUser} />
  );
}

export default App;
