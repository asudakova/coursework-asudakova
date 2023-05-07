import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import { setupStore } from './redux/store.ts'

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,
    <Provider store={store}>
        <App />
    </Provider> 
)
