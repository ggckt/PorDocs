import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddBlog from './Components/AddBlog';
import AskQuestion from './Components/AskQuestion'
import Home from './Components/Home'
import EditBlog from './Components/EditBlog';
import { useState } from 'react';
import EditQuestion from './Components/EditQuestion';
import ViewBlog from './Components/ViewBlog';
import Blogs from './Components/Blogs';
import Questions from './Components/Questions'
import ViewQuestion from './Components/ViewQuestion'
import AdminPanel from './Components/AdminPanel';
import Footer from './Components/Footer'
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import { Helmet } from 'react-helmet'
function App() {

  const [isLogedin, setisLogedin] = useState(false)

  const logout = () => {
    setisLogedin(false);
  }
  const login = () => {
    setisLogedin(true)
  }

  return (
    <BrowserRouter>
      <Header isLogedin={isLogedin} logout={logout} login={login} />
      <Helmet>
        <title>PorDocs</title>
        <meta name="description" content="PorDocs is a Financial website containing blogs and questions related to finance " />
        <meta name="keywords" content="pordocs,finance,blogs,questions,answers,PorDocs" />
      </Helmet>
      <Switch>
        <Route path='/' exact render={(props) => <Home isLogedin={isLogedin} {...props} />} ></Route>
        <Route path='/addblog' exact render={(props) => <AddBlog isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/blog/page/:pageno' exact render={(props) => <Blogs isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/blog/:id' exact render={(props) => <ViewBlog isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/blog/edit/:id' exact render={(props) => <EditBlog isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/askquestion' exact render={(props) => <AskQuestion isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/question/page/:pageno' exact render={(props) => <Questions isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/question/:id' exact render={(props) => <ViewQuestion isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/question/edit/:id' exact render={(props) => <EditQuestion isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/adminpanel' exact render={(props) => <AdminPanel isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/profile/edit/:id' exact render={(props) => <EditProfile isLogedin={isLogedin} {...props} />}></Route>
        <Route path='/profile/:id' exact render={(props) => <Profile isLogedin={isLogedin} {...props} />}></Route>

      </Switch>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
