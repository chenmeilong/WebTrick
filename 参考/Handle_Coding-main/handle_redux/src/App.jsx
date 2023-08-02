import React, { useState, useContext } from "react";

const appContext = React.createContext(null);
const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "frank", age: 18 },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <First />
      <Second />
      <Third />
    </appContext.Provider>
  );
};

const First = () => (
  <section>
    First
    <User />
  </section>
);
const Second = () => (
  <section>
    Second
    <UserModifier />
  </section>
);
const Third = () => <section>Third</section>;

const User = () => {
  const contextValue = useContext(appContext);
  return <div>User:{contextValue.appState.user.name}</div>;
};

const UserModifier = () => {
  const contextValue = useContext(appContext);
  const onChange = (e) => {
    contextValue.appState.user.name = e.target.value;
    contextValue.setAppState({...contextValue.appState});
  };
  return (
    <div>
      <input
        type="text"
        value={contextValue.appState.user.name}
        onChange={onChange}
      />
    </div>
  );
};
export default App;
