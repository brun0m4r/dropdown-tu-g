import logo from './logo.svg';
import './App.css';
import { Combobox } from './Components/Combobox';
import { SearchBar } from './Components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Combobox /> */}
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
