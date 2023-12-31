import { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './AuthForm';
import CreatePost from './CreatePost';
import Posts from './Posts';
import Post from './Post';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import MostExpensivePost from './MostExpensivePost';

import { useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';


function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(()=> {
    const fetchPosts = async()=> {
      const posts = await api.fetchPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []); // I believe the dependency array should be updated with posts for edit.

  useEffect(()=> {
    const attemptLogin = async()=> {
      try {
        const _auth = await api.loginWithToken();
        setAuth(_auth);
      }
      catch(ex){
        console.log(ex);
      }
    };
    attemptLogin();
  }, []);

  const register = async(credentials)=> {
    const _auth = await api.register(credentials);
    setAuth(_auth);
  };

  const login = async(credentials)=> {
    const _auth = await api.login(credentials);
    setAuth(_auth);
  };

  const logout = ()=> {
    api.logout();
    setAuth({});
  };

  const createPost = async(post)=> {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    navigate(`/posts/${post._id}`);
  };

  const deletePost = async(post)=> {
    await api.deletePost(post);
    setPosts(posts.filter(item => item._id !== post._id));
    navigate(`/`);
  };

  const userPostCount = posts.filter(post => auth._id === post.author._id).length;

  return (
    <>
      <h1><Link to='/'>Strangers Things ({ posts.length })</Link></h1>
      {
        auth.username ? (
          <div>
            <h1>
              Welcome { auth.username } ({ userPostCount })
              <button onClick={ logout }>Logout</button>
            </h1>
            <Link to='/posts/create'>Create A Post</Link>
            <Link to='/about_us'>About Us</Link>
            <Link to='/contact_us'>Contact Us</Link>
            <Link to='/expensive'>Most Expensive Post</Link>
            <Routes>
              <Route path='/posts/create' element={ <CreatePost createPost={ createPost } />} />
            </Routes>
          </div>
        ): (
          <>
            <AuthForm submit={ register } txt='Register'/>
            <AuthForm submit={ login } txt='Login'/>
            <Link to='/about_us'>About Us</Link>
            
          </>
        )
      }
      <Posts posts={ posts } auth={ auth }/>
      <Routes>
        <Route path='/posts/:id' element={ <Post posts={ posts } auth={ auth } deletePost={ deletePost } />} />
        <Route path='/about_us' element={ <AboutUs />} />
        <Route path='/contact_us' element={ <ContactUs /> } />
        <Route path='/expensive' element={ <MostExpensivePost posts={ posts } />} />
      </Routes>
    </>
  )
}

export default App
