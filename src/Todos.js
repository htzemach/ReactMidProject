    import {useState} from "react"


    function Todos(props)
    {
        const [todo, setTodo] = useState({title:"",completed:false})

        const [isAddTodo, setIsAddTodo] = useState(false)

        const [isNotCompleted, setIsNotCompleted] = useState(true)

        const markComplete = (id) =>{
            props.callback(id)
            setIsNotCompleted(!isNotCompleted)
        }

        const addTodo=()=>
        {
            props.todoCallback([...props.tasks,todo])
            setIsAddTodo(false)
        }
        
        return <div style={{ padding:"10px", border: "1px solid blue" } }>
         
          Todos:
          <input type="button" value="Add" onClick={()=>setIsAddTodo(true)}/><br/>

            {
            
                props.tasks.map((item)=>{
                    return <div key={item.id} style={{ padding:"10px", border: "1px solid black" ,width:"80%"} }>
                    <span>Title:  </span> <input type={"text"} value={item.title}/><br/>
                    <span>completed:  </span><input type={"text"} value={item.completed}/><br/>
                    {  !item.completed  && <input type="button" value="Mark Completed" onClick={()=>markComplete(item.id) }/>}
                    </div>
                })
        
        }

        {
         isAddTodo && <div>
            <form>
            <input type="text" onChange={(e) => setTodo({ ...todo, title: e.target.value })} />

            <input type="button" value="Cancel" onClick={() =>setIsAddTodo(false)} />

            <input type="submit" value="Add" onClick={() => addTodo()} />
            </form>
        </div>
        }

    
        </div>
    }export default Todos
