import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import i18n from '../Locales';


import { KCMS_URL, KCMS_SECRET_KEY, KCMS_PROJECT_ID } from '../../src/Constants';


class TopNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: false,
      addProfile: false,
      showClass: false,
      view: [],
      listView: null,
      newCatList: [],
      query: '',
      prevScrollpos: window.pageYOffset,
      visible: true
    }
    this.searchInput = this.searchInput.bind(this);
    this.enableRedirect = this.enableRedirect.bind(this)
  }


  setListView(body) {
    this.setState({ listView: body })
    this.setNewRelease(body.id)
  }

  setNewRelease = async (id) => {
    try {
      const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/get-list-view-items-names/${id}`
      const resp = await fetch(url);
      const respObj = await resp.json();
      this.setState({ newCatList: respObj.data })
    } catch (e) {
      console.log("Error in new category lissetListViewt", e.message)
    }
  }

  setListViewState = async (value) => {
    try {
      const url = `${KCMS_URL}/api/project/${KCMS_SECRET_KEY}/${KCMS_PROJECT_ID}/list_views`
      let resp = await fetch(url);
      let respObj = await resp.json();
      let catData = respObj.view_lists.filter(item => item.is_new_release === false);
      this.setState({view: catData})
      this.props.setViewLists(catData)
      console.log('List view:', respObj)
      let self = this;
      await respObj.view_lists.map(async (item) => {
        if (item.is_new_release) {
          await self.setListView(item)
        }
      })

    } catch (e) {
      console.log("Error in App->ListView", e.message)
    }
  }

  componentDidMount() {
    this.setListViewState();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillMount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };


  enableRedirect = (e) => {
    if (e.key === 'Enter' && this.state.query.trim() !== '') {
      this.props.history.push('/search', this.state.query)
    }
  }

  searchInput = (e) => {
    this.setState({ query: e.target.value })
    if (e.key === 'Enter') {
      console.log('do validate');
    }

  }

  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }
  toggleLink(e) {
    this.setState({ showClass: !this.state.showClass });
    e.preventDefault()
  }
  brandHide() {
    this.setState({ disPlay: !this.state.disPlay });
  }
  toggleUser() {
    this.setState({ addProfile: !this.state.addProfile });
  }
  render() {
    let changeClass = [" "];
    if (this.state.addClass) {
      changeClass.push('open d-block');
    }
    let changeLogin = [" "];
    if (this.state.addProfile) {
      changeLogin.push('open d-block');
    }
    let changeLink = [" "];
    if (this.state.showClass) {
      changeLink.push('collapsed');
    }
    let changeShow = [" "];
    if (this.state.showClass) {
      changeShow.push('show');
    }
    let changeHide = [" "];
    if (this.state.disPlay) {
      changeHide.push('brand-hide');
    }

    return (

      <div>
        {/* the side menu bar */}

        <div className={'navbar-collapse offcanvas-collapse navbar-adj' + changeClass.join(' ')}>
          <div className="sidebar-hide">
            <div className="blank-area" onClick={this.toggle.bind(this)}></div>
            <nav id="sidebar" className="sidebar">
              <div className="sidebar-content">

                {this.props.isUser ?
                  <div className="sidebar-user">
                    <Link to="/profile" onClick={this.toggle.bind(this)}>
                      <img src={this.props.userData.avatar_url || "avatar.jpg"} className="img-fluid rounded-circle mb-2" alt="" />
                      <div className="font-weight-bold"></div>
                      <div className="ellipsis"><small className="user-name ellipsis">{this.props.userData.name}</small></div>
                    </Link>
                  </div>
                  :
                  ''
                }

                <ul className="sidebar-nav">

                  {
                    this.state.view && this.state.view.map(item=>{
                      return(
                        <li key={`side-nav-${item.id}`} className={"sidebar-item new-items " + (window.location.pathname === `/category/${item.id}` ? 'active' : '')}>
                          <Link to={`/category/${item.id}`} className="sidebar-link" onClick={this.toggle.bind(this)}>
                            <i className="dt-icon-home"></i> <span className="align-middle">{this.props.lang ==='' ? item.name:item['title'+this.props.lang]}</span>
                          </Link>
                        </li>
                      )
                    })
                  }

                  {/* <li className={"sidebar-item new-items " + (window.location.pathname === "/" ? 'active' : '')}>
                    <Link to="/" className="sidebar-link" onClick={this.toggle.bind(this)}>
                      <i className="dt-icon-home"></i> <span className="align-middle">{i18n.home}</span>
                    </Link>
                  </li>
                  <li className={"sidebar-item new-items " + (window.location.pathname === "/dramas" ? 'active' : '')}>
                    <Link to="/dramas" className="sidebar-link" onClick={this.toggle.bind(this)}>
                      <i className="dt-icon-dramas"></i> <span className="align-middle">{i18n.dramas}</span>
                    </Link>
                  </li>
                  <li className={"sidebar-item new-items " + (window.location.pathname === "/telefilms" ? 'active' : '')}>
                    <Link to="/telefilms" className="sidebar-link" onClick={this.toggle.bind(this)}>
                      <i className="dt-icon-movies"></i> <span className="align-middle">{i18n.telefilms}</span>
                    </Link>
                  </li>
                  <li className={"sidebar-item new-items " + (window.location.pathname === "/video-songs" ? 'active' : '')}>
                    <Link to="/video-songs" className="sidebar-link" onClick={this.toggle.bind(this)}>
                      <i className="dt-icon-video-songs"></i> <span className="align-middle">{i18n.videosongs}</span>
                    </Link>
                  </li> */}

                  <li className={"sidebar-item new-items " + (window.location.pathname === "/newrelease" ? 'active' : '')}>
                    <Link to="" data-toggle="collapse" className={"sidebar-link " + changeLink.join(' ')} onClick={this.toggleLink.bind(this)}>
                      <i className="dt-icon-new-release"></i> <span className="align-middle">{i18n.newrelease}</span>
                    </Link>
                    <ul className={"sidebar-dropdown list-unstyled collapse" + changeShow.join(' ')}>
                      {
                        this.state.newCatList.map((item) => {
                          return (
                            <li key={"mob-" + item.id} className="">
                              <Link className="sidebar-link"
                                to={{
                                  pathname: "/newrelease",
                                  state: item.id
                                }}
                                onClick={this.toggle.bind(this)}
                              >
                                {item['label' + this.props.lang]}
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </li>
                  <li className="sidebar-item new-items">
                    {this.props.lang !== '' && <Link to="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); this.props.setLang(''); return false; }}>
                      <i className="dt-icon-language"></i> <span className="align-middle text-in-urdu">ENG</span>
                    </Link>}
                    {this.props.lang !== '_ur' && <Link to="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); this.props.setLang('_ur'); return false; }}>
                      <i className="dt-icon-language"></i> <span className="align-middle">اردو</span>
                    </Link>}
                  </li>

                  {
                    this.props.isUser && <li className="sidebar-item new-items ">
                      <Link to="" className="sidebar-link" onClick={() => { this.props.setUser({}, false); this.toggle.bind(this); localStorage.removeItem('user') }}>
                        <i className="dt-icon-logout"></i> <span className="align-middle">{i18n.logout}</span>
                      </Link>
                    </li>
                  }
                  <li></li>
                  {/* <li className="sidebar-item new-items">
                    <Link to="" className="sidebar-link" onClick={this.toggle.bind(this)}>
                      <img src="brand.png" className="img-fluid " alt="" />
                    </Link>
                  </li> */}
                </ul>
              </div>
            </nav>

          </div>
        </div>

        {/* end of the side menu bar */}
        <nav className="navbar fixed-top navbar-light bg-light vbx-blue cellphone-nav">
          <button className="navbar-toggler" type="button" onClick={this.toggle.bind(this)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-brand">
            <Link to="/">

              <img src="/logo.svg" alt="" className="logo" width="100%" />

            </Link>
          </div>
          <input type="text" value={this.state.query} onKeyPress={this.enableRedirect} onChange={this.searchInput} onClick={this.brandHide.bind(this)} placeholder={i18n.searchfor} className="search__field" />
          <button type="submit" className="search__icon"></button>

        </nav>
        <nav className="navbar fixed-top navbar-light bg-light vbx-blue desktop-nav">

          <div className="container pl-0 pr-0">
            <div className="row w-100 m-0">
              <div className="col col-md-3 col-lg-1 pl-0 pr-0">
                <button className="navbar-toggler" type="button" onClick={this.toggle.bind(this)}>
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-brand">
                  <Link to="/">

                    <img src="/logo.svg" alt="" className="logo" width="100%" />

                  </Link>
                </div>

              </div>
              <div className="col col-md-auto menu-nav">
                <div className="menu-container">
                  <nav className="menu w-100">
                    <ol className="">

                      {
                        this.state.view && this.state.view.map(item=>{
                          return(
                            <li key={'nav'+item.id} className={"menu-item " + (window.location.pathname === `/category/${item.id}` ? 'active' : '')}  >
                              <Link to={`/category/${item.id}`}> {this.props.lang ==='' ? item.name:item['title'+this.props.lang]} </Link>
                            </li>
                          )
                        })
                      }
                      {/* <li className={"menu-item " + (window.location.pathname === "/" ? 'active' : '')}  >
                        <Link to="/"> {i18n.home} </Link>
                      </li>
                      <li className={"menu-item " + (window.location.pathname === "/dramas" ? 'active' : '')}>
                        <Link to="/dramas"> {i18n.dramas} </Link>
                      </li>
                      <li className={"menu-item " + (window.location.pathname === "/telefilms" ? 'active' : '')}>
                        <Link to="/telefilms"> {i18n.telefilms} </Link>
                      </li>
                      <li className={"menu-item " + (window.location.pathname === "/video-songs" ? 'active' : '')}>
                        <Link to="/video-songs"> {i18n.videosongs} </Link>
                      </li> */}
                      {
                        this.state.newCatList.length > 0 && <li className={"menu-item  " + (window.location.pathname === "/newrelease" ? 'active' : '')}>

                          <Link to="#" onClick={(event) => event.preventDefault()} className="last"> {i18n.newrelease} </Link>
                          <ol className="sub-menu">
                            {
                              this.state.newCatList.map((item) => {
                                return (
                                  <li className="menu-item" key={item.id}>
                                    <Link to={{
                                      pathname: "/newrelease",
                                      state: item.id
                                    }}
                                      onClick={this.toggle.bind(this)}
                                      replace
                                    >
                                      {item['label' + this.props.lang]}

                                    </Link></li>
                                )
                              })

                            }
                          </ol>

                        </li>
                      }
                    </ol>
                  </nav>


                </div>

              </div>
              <div className="col pr-0 ">
                <div className="">
                  <input type="text" value={this.state.query} onKeyPress={this.enableRedirect} onChange={this.searchInput} onClick={this.brandHide.bind(this)} placeholder={i18n.searchfor} className="search__field" />
                  <button type="submit" className="search__icon"></button>
                </div>
              </div>
              <div className="col col-md-auto pr-0 d-none d-md-block" style={{ marginTop: '1px' }}>
                <nav className="menu user-language ml-2">
                  <ol>
                    <li className="menu-item">
                      <Link to="#" onClick={(event) => event.preventDefault()} className="ml-0 pl-0 mb-0 pb-0 pt-0 mr-0">
                        <div className="sidebar-user user text-light" style={{ border: 'none' }}>
                          <i className="dt-icon-language"></i>
                        </div>
                      </Link>
                      <ol className="sub-menu">
                        <li className="menu-item">
                          {this.props.lang !== '_ur' && <Link to="#" onClick={(e) => { e.preventDefault(); this.props.setLang('_ur'); return false; }}>
                            اردو
                          </Link>}
                        </li>
                        <li className="menu-item">
                          {this.props.lang !== '' && <Link to="#" onClick={(e) => { e.preventDefault(); this.props.setLang(''); return false; }}>
                            Eng
                          </Link>}
                        </li>
                      </ol>

                    </li>
                  </ol>
                </nav>
              </div>
              {
                this.props.isUser &&
                // <div className="user-login d-none d-sm-block" onClick={()=>{this.props.setUser({}, false); localStorage.removeItem('user')}}>
                //   {this.props.userData.name} <i className="lni lni-user"></i>
                // </div>
                // <div style={{ height: '50px', marginTop: '9px', marginRight: '-5px' }}>
                <div className="col col-md-auto pr-0 d-none d-md-block pl-0">
                  <nav className="menu user-profile ml-2">
                    <ol>
                      <li className={"menu-item  " + (window.location.pathname === "/profile" ? 'active' : '')}>

                        <Link to="#" onClick={(event) => event.preventDefault()} className="ml-0 pl-0 mb-0 pb-0 pt-0">
                          <div className="row ml-0">
                            <div className="col pl-2 pr-2">
                              {this.props.userData.name
                                ?
                                <small className="user-name ellipsis mt-2"> {this.props.userData.name} </small>
                                :
                                <small className="user-name ellipsis mt-2 user-color"> User </small>
                              }
                            </div>
                            <div className="col-auto pl-0 pr-0  align-self-end">
                              <div className="sidebar-user user p-0">
                                <img
                                  src={this.props.userData.avatar_url || "avatar.jpg"}
                                  className="img-fluid rounded-circle"
                                  alt=""
                                  style={{ width: '42px', height: '42px', border: 'none' }}

                                />
                              </div>
                            </div>
                          </div>



                        </Link>
                        <ol className="sub-menu">
                          <li className="menu-item">
                            <Link to="/profile" onClick={() => { this.toggle.bind(this) }}>
                              <i className="dt-icon-user"></i> {i18n.profile}
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link to=""
                              onClick={() => { this.props.setUser({}, false); this.toggle.bind(this); localStorage.removeItem('user') }}>
                              <i className="dt-icon-logout mr-1"></i>  {i18n.logout}
                            </Link>
                          </li>
                        </ol>

                      </li>
                    </ol>
                  </nav>



                </div>
              }


            </div>



          </div>

        </nav>

      </div>

    );
  }
}

export default withRouter(TopNavbar);