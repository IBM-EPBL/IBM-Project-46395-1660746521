import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login_page/login_page";
import Register from "./pages/register_page/register_page";
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const navigation = useNavigate()
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff9999",
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });
  return (<ThemeProvider theme={theme}>
    <div class="box-form">
      <div class="left">
        <div class="overlay">
          <h1>Personal Expense Tracker</h1>
          <p>If you've ever decided to get a handle on your cash flow, you know that the first step is knowing how you're spending your money. That's something really low on the fun-to-do meter.</p>
        </div>
        <div className="imgbox">
          <img className="imgdesign" src={require('./assets/tracker.png')} alt="Track your expense"/>
        </div>
      </div>
      <div class="right">
        <Routes>
          <Route path="/" element={<Login navigation={navigation} />} />
          <Route path="/register" element={<Register navigation={navigation} />} />
        </Routes>
      </div>
    </div>
  </ThemeProvider>)
}

export default App;
 