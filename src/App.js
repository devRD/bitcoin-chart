import './App.css';
import Form from './components/forms.js';

function App() {
  return (
    <div className="mx-3 d-flex justify-content-center align-items-center" style={{"height": "100vh"}}>
      <div className="w-50 border border-dark rounded shadow bg-form p-4">
        <Form />
      </div>
    </div>
  );
}

export default App;
