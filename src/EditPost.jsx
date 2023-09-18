import { useState} from "react";

const EditPost = () => {
    const [editPost, setEditPost] = useState({});
}

return (
    <div>
      <form onSubmit={ submit }>
        {
          error ? JSON.stringify(error, null, 2) : null
        }
        <input placeholder='title' onChange={ev => setTitle(ev.target.value)} />
        <input placeholder='description' onChange={ev => setDescription(ev.target.value)} />
        <input placeholder='price' onChange={ev => setPrice(ev.target.value)} />
        <input placeholder='location' onChange={ev => setLocation(ev.target.value)} />
        <button>Edit Post</button>
      </form>
      <Link to='/'>Cancel</Link>
    </div>
  );