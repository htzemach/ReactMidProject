import UserComp from "./UserComp"
import { useState, useEffect } from 'react'
import Utils from "./Utils"
import axios from 'axios';

function MaimComp() {
    const [users, setUsers] = useState([])

    const [user, setUser] = useState({ id: 11, name: "", email: "", address: {} })

    const [newAddress, setNewAddress] = useState({ street: "", city: "", zipcode: "" })

    const [isAddUser, setIsAddUser] = useState(false)

    const [query, setQuery] = useState("")

    function addUser() {

        // setUser({ ...user })

        setUser({ ...user, id: user.id + 1, address: newAddress })

        setIsAddUser(false)

        setUsers([...users, user])

    }



    async function updateUserLocal(user) {

        let arr = users
        arr.find(x => x.id === user.id).name = user.name
        arr.find(x => x.id === user.id).email = user.email
        setUsers(arr)
        await axios.put("https://jsonplaceholder.typicode.com/users/" + user.id, user)
        alert("updated")
    }



    async function deleteUserLocal(id) {
        let arr = users

        setUsers(arr.filter(x => x.id !== id))
        await axios.delete("https://jsonplaceholder.typicode.com/users/" + id)
        alert("deleted")
    }



    const getUsers = async () => {
        let resp = await Utils.getUsers();
        setUsers(resp.data);
    }


    useEffect(() => {
        getUsers()
    }, [])


    return <div>

        <h1>Search:</h1>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <input type="button" value="Add" onClick={() => setIsAddUser(true)} />

        {users.filter(item => {
            if (query === '') {
                return item;
            } else if (item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
                (item.email.toLocaleLowerCase().includes(query.toLocaleLowerCase()))) {
                return item;
            }
        }).map(item => {
            return <div key={item.id}>
                <UserComp userData={item} callback={updateUserLocal} deleteCallBack={deleteUserLocal} /><br />
                <br />
            </div>

        })

        }

        {
            isAddUser && <  div border="1">
                name:   <input type="text" onChange={(e) => setUser({ ...user, name: e.target.value })} /><br />
                email:  <input type="text" onChange={(e) => setUser({ ...user, email: e.target.value })} /><br />
                street:  <input type="text" onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} /><br />
                city:  <input type="text" onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} /><br />
                zipCode: <input type="text" onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })} /><br />

                <input type="button" value="Cancel" onClick={() => setIsAddUser(false)} />
                <input type="button" value="Add" onClick={() => addUser()} />
            </div>
        }



    </div>
} export default MaimComp