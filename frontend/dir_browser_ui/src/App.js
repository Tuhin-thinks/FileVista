import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './components/routing/HomeRoute/Home';

// const router = createBrowserRouter({
//     path: '/',
//     element: <Home />,
// });

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
