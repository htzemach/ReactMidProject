import { useState } from "react"

function Posts(props) {
    const [isAddPost, setIsAddPost] = useState(false)

    const [post, setPost] = useState({})

    function addPost() {

        setIsAddPost(false)
        props.postsCallback(post)

    }

    return <div style={{ clear: "right", padding: "10px", border: "1px solid red" }}>

        Posts:
        <input type="button" value="Add" onClick={() => setIsAddPost(true)} /><br />

        {

            props.post.map((item, index) => {
                return <div key={index} style={{ padding: "1px", border: "1px solid black", width: "80%" }}>
                    <span>Title:   <input type={"text"} value={item.title} /></span><br />
                    <span>Body:  </span><input type={"text"} value={item.body} /><br />
                </div>
            })}

        {
        isAddPost && <div>
            <input type="text" onChange={(e) => setPost({ ...post, title: e.target.value })} />

            <input type="text" onChange={(e) => setPost({ ...post, body: e.target.value })} />

            <input type="button" value="Cancel" onClick={() =>setIsAddPost(false)} />

            <input type="button" value="Add" onClick={() => addPost(post)} />
        </div>
        }




    </div>
} export default Posts