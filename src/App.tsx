import './App.css';
import Layout from './components/Layout';
import Flights from './pages/Flights';

function App() {
  return (
    <div className="App">
      <Layout>
        <Flights />
      </Layout>
    </div>
  );
}

export default App;
