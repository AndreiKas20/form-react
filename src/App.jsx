import './App.css';
import './assets/css/normalize.css'
import './assets/css/main.global.css'
import {Form} from "./Form";
import {useState} from "react";
import Button from "./UI/Button/Button";


function App() {
    const [isForm, setIsForm] = useState(false)
    const openForm = (e) => {
        e.stopPropagation()
        setIsForm(true)
    }
    return (
        <div className="App">
            {
               isForm && <Form setIsOpenForm={setIsForm}/>
            }
            {
                !isForm && <Button text={"Открыть форму"} onClick={openForm} isSend={false}/>
            }
        </div>
    );
}

export default App;
