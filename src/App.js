import './styles/global.scss';
import Layout from "./components/layout";
import Routers from "./Route";
import {BrowserRouter} from "react-router-dom";
import './assets/icomoon/style.css'

function App() {

    return (
        <BrowserRouter>
        <div className="App">
                <Layout>
                    <Routers/>
                </Layout>
        </div>
        </BrowserRouter>
    );
}

export default App;
