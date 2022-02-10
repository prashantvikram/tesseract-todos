import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import Alert from "./components/Alert";

import "./App.css";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="app">
      <Header />
      <Stats />
      <List />
      <Editor />
      <Alert />
    </div>
  );
}

export default App;
