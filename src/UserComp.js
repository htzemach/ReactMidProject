import { useState ,useEffect} from "react"
import Todos from "./Todos"
import Utils from "./Utils"
import Posts from "./Posts"
function UserComp(props) {

  const [showTasks, setShowTasks] = useState(false)

  const [itsOrange, setItsOrange] = useState(false)

  const [showPosts, setShowPosts] = useState(false)

  const [showOtherData, setshowOtherData] = useState(false)

  const [todos, setTodos] = useState([])

  const [posts, setPosts] = useState([])

  const [allCompleted, setAllCompleted] = useState(false)

  const [newUserData, setNewUserData] = useState({ id: props.userData.id, name: props.userData.name, email:props.userData.email})


  const getTasks = async () => {
    setShowTasks(!showTasks)
    setItsOrange(!itsOrange)
    let userTodos = await Utils.getUsersTasks(props.userData.id)

    setTodos(userTodos)

  }

  const getPosts = async () => {
    setShowPosts(!showPosts)

    let userPosts = await Utils.getUsersPosts(props.userData.id)

    setPosts(userPosts)
  }

  const getOtherData = () => {
    setshowOtherData(!showOtherData)
  }

  const getTodosAndPosts = () => {
    getTasks();
    getPosts();
  }

  const deleteUser = async () => {

    await Utils.deleteUser(props.userData.id)
  }

  const markCompleted=(id)=>
  {

      let arr=todos
      arr.find(x=>x.id===id).completed=true
      setTodos(arr)
      
      setAllCompleted(arr.every(v => v.completed === true))
    
    }

    const addPost=(post) =>
    {
       setPosts([...posts, post])
    }
  


    return <div style={{ width: "340px", padding: "10px", border: allCompleted?"1px solid green": "1px solid red", backgroundColor: itsOrange ? "orange" : "white" }}>

    <span onClick={getTodosAndPosts} >ID: </span>{props.userData.id}<br />
    Name: <input type="text" onfocus="this.value=''" value={newUserData.name}
                onChange={e => setNewUserData({ ...newUserData, name: e.target.value })} /><br /><br />

            Email: <input type="text" value={newUserData.email}
                onChange={e => setNewUserData({ ...newUserData, email: e.target.value })} /><br /><br />

    <button style={{ margin: "18px" }} onMouseOver={getOtherData}>other data</button>
    <input type="button" value="Update" style={{ background: "orange" }}
                onClick={() => props.callback(newUserData)} />

        <input type="button" value="Delete" style={{ background: "orange" }}
                    onClick={() => props.deleteCallBack(newUserData.id)} />
    {
      showTasks &&<Todos callback={markCompleted}  tasks={todos} todoCallback={setTodos} />
    }


    {
      showPosts && <h3>  posts user{props.userData.id}</h3> && <br /> &&
      <Posts post={posts } postsCallback={addPost}/>
}

    {
      showOtherData && <div style={{ width: "320px", padding: "7px", borderRadius: "25px", border: "1px solid green" }}>

        <span style={{ padding: "16px" }} > Street :    </span>   <input type="text" value={props.userData.address.street} /><br />
        <span style={{ padding: "23px" }}> City :  </span>   <input type="text" value={props.userData.address.city} /><br />
        <span style={{ padding: "4px" }}> Zip Code :     </span>   <input type="text" value={props.userData.address.zipcode} /><br />



      </div>
    }
  </div>
} export default UserComp