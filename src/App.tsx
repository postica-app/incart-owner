import { useState } from "react";
import { FormField, Text2, Input } from "incart-fe-common";
import { ReactComponent as Person } from "incart-fe-common/src/icons/Person.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FormField name="이름" info="내용" required>
        <Input placeholder="넵?" icon={(style) => <Person style={style} />} />
      </FormField>
    </div>
  );
}

export default App;
