import react from "react";
import "./App.css";
import {container} from" semantic-ui-react";
import ToDoList from "./To-Do-List";


function App(){
  return(
    <div>
      <container>
        <ToDoList/>
      </container>

    </div>
  );
}

export default App;