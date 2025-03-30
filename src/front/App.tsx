import './App.css'
import {CreateMessage} from "./Components/CreateMessage";
import {Queues} from "./Components/Queues";

function App() {
    return <div id='app'>
        <div className='container'>
            <CreateMessage />
            <Queues />
        </div>
    </div>
}

export default App
