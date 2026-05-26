import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/posts"
      )

      setPosts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/posts", {
        username,
        message,
      })

      setUsername("")
      setMessage("")

      fetchPosts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Message Board</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Post Message
        </button>
      </form>

      <hr />

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.username}</h3>

          <p>{post.message}</p>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default App