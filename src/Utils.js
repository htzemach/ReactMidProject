import axios from 'axios';


const getUsers =  ()=>
{
    return axios.get("https://jsonplaceholder.typicode.com/users")
}

const getUsersTasks = async (userId)=>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/todos?userId="+ userId)
    let userTodos = resp.data;
     
    return userTodos
}

const getUsersPosts = async (userId)=>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/posts?userId="+ userId)
    let userPosts = resp.data;
     
    return userPosts
}
const deleteUser = async (userId)=>
{
    let resp = await axios.delete("https://jsonplaceholder.typicode.com/users?userId"+ userId)
    let userTodos = resp.data;
     
    return userTodos
}

export default  {getUsers, getUsersTasks, getUsersPosts,deleteUser}