import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';


//********** Constants  **********//

import { DRAMATIME_URL, DT_SECRET_KEY, DT_PROJECT_ID } from '../src/Constants';


//********** Components  **********//

import TopNavbar from './Components/TopNavbar'
import Home from './Components/Home';
import Dramas from './Components/Dramas';
import Telefilms from './Components/Telefilms';
import Play from './Components/Play';
import NewRelease from './Components/NewRelease';
import Search from './Components/Search';
import Profile from './Components/Profile';
import VideoSongs from './Components/VideoSongs';
import Footer from './Components/Footer';
import Privacy from './Components/Privacy';
import ScrollToTop from './Components/ScrollToTop'
import Category from './Components/Category';

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      loggedIn: localStorage.getItem('user') ? true : false,
      lang: localStorage.getItem('lang') || '', // for en we dont need any type
      view_lists: []
    }
    this.setUser = this.setUser.bind(this);
    this.setLang = this.setLang.bind(this);
    this.setViewLists = this.setViewLists.bind(this);
  }



  componentWillMount() {

    let url = new URL(window.location.href)
    let msisdn = url.searchParams.get('msisdn')
    if (msisdn) this.getUserDetails(msisdn)


  }


  componentDidMount() {

    if (this.state.lang === '_ur') {
      import('./App-rtl.css')
    }
  }

  setUser(loggedInUser, loggedInStatus) {

    this.setState({ user: loggedInUser })
    this.setState({ loggedIn: loggedInStatus });
    console.log('User login', this.state.user)
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(loggedInUser))

  }

  setLang(newLang) {

    localStorage.setItem('lang', newLang)
    //this.setState({ lang: newLang });
    window.location.reload()

  }

  setViewLists(list) {
    console.log('lit', list)
    this.setState({view_lists: list})
  }

  async getUserDetails(number) {

    if (!this.state.loggedIn) {
      let url = `${DRAMATIME_URL}/api/user/get_user_status?msisdn=${number}&project_id=${DT_PROJECT_ID}&secret_key=${DT_SECRET_KEY}&web_user=1`
      let resp = await fetch(url)
      let respObj = await resp.json()
      if (respObj.status === 1 && respObj.user.subscribe_status === 1) { this.setUser(respObj.user, true); }
    }

  }


  render() {
    return (
      <div>
        {
          <Router>
            <div className="container-fluid">
              <div className="row">
                <div className="col pl-0 pr-0 wrapper">

                  <TopNavbar props={this.props}  setViewLists={this.setViewLists} isUser={this.state.loggedIn} setUser={this.setUser} userData={this.state.user} setLang={this.setLang} lang={this.state.lang}/>

                  <Route exact path="/" render={(props) => <Home {...props} lang={this.state.lang} viewLists={this.state.view_lists}></Home>} />
                  {/* <Route exact path="/dramas" render={(props) => <Dramas {...props} lang={this.state.lang}></Dramas>} />
                  <Route exact path="/telefilms" render={(props) => <Telefilms {...props} lang={this.state.lang}></Telefilms>} />
                  <Route exact path="/video-songs" render={(props) => <VideoSongs {...props} lang={this.state.lang}></VideoSongs>} /> */}
                  <Route exact path="/newrelease" render={(props) => <NewRelease {...props} lang={this.state.lang}></NewRelease>} />
                  <Route exact path="/search" render={(props) => <Search {...props} lang={this.state.lang}></Search>} />
                  <Route exact path="/play" render={(props) => <Play {...props} isUser={this.state.loggedIn} userData={this.state.user} setUser={this.setUser} lang={this.state.lang}></Play>} />
                  <Route exact path="/profile" render={(props) => <Profile {...props} isUser={this.state.loggedIn} userData={this.state.user} setUser={this.setUser} lang={this.state.lang}></Profile>} />
                  <Route exact path="/privacy" render={(props) => <Privacy {...props} ></Privacy>} />

                  <Route exact path="/:id" render={(props) => <Category {...props} lang={this.state.lang} ></Category>} />

                  

                </div>
              </div>
              <div className="row align-items-end">
                <div className="col p-0">
                  <Footer />
                </div>
              </div>
            </div>
            <ScrollToTop />
          </Router>
        }

      </div>
    );
  }
}

export default App;