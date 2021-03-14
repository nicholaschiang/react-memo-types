import React from 'react';
import logo from './logo.svg';
import './App.css';

interface GenericComponentProps<T> {
  value: T;
  onChange: (value: T) => void;
}

function GenericComponent<T>({ 
  value, 
  onChange 
}: GenericComponentProps<T>): JSX.Element {
  return (
    <p>Value: {value}</p>
  );
}

// Using `React.memo` removes TypeScript's ability to detect the `T` generic. 
const GenericComponentMemo = React.memo(GenericComponent);

// This component specifies `T` as a `string`.
type ComponentProps = GenericComponentProps<string>;

// Replace `<GenericComponentMemo />` with `<GenericComponent />` and you'll
// notice that it compiles again because TypeScript is able to detect that the
// generic type parameter `T` is `string` in this scenario.
function Component({ 
  value,
  onChange
}: ComponentProps): JSX.Element {
  return (
    <GenericComponentMemo value={value} onChange={onChange} />
  );
}

function App(): JSX.Element {
  const [value, setValue] = React.useState<string>('Initial Value');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Component value={value} onChange={setValue} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
