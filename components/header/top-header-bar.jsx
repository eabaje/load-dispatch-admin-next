import React, { useEffect, useContext } from "react";
import { IMG_URL, LOG_IN } from "../../constants";
import { GlobalContext } from "../../context/Provider";
import { signout } from "../../context/actions/auth/auth.action";
import Link from "next/link";
import { ROLES } from "../../constants/enum";
import { useRouter } from "next/router";

function TopHeaderBar() {
  const router = useRouter();
  const {
    authDispatch,
    authState: { user, isLoggedIn },
  } = useContext(GlobalContext);

  const logOut = () => {
    signout()(authDispatch);
  };

  // useEffect(() => {
  //   if (isLoggedIn === false) {
  //     router.push("/");
  //   }

  //   //  setUser(JSON.parse(localStorage.getItem("user")));
  // }, [isLoggedIn]);
  console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <>
      {" "}
      <header className="navbar pcoded-header navbar-expand-lg navbar-light header-blue">
        <div className="m-header">
          <a className="mobile-menu" id="mobile-collapse" href="#!">
            <span></span>
          </a>
          <a href="#!" className="b-brand">
            <img
              src="assets/images/logo-small-prod-2.png"
              alt=""
              className="logo-main"
            />
          </a>

          <a href="#!" className="mob-toggler">
            <i className="feather icon-more-vertical"></i>
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="#!" className="pop-search">
                <i className="feather icon-search"></i>
              </a>
              <div className="search-bar">
                <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Search hear"
                />
                <button type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li>
              <div className="dropdown">
                <a className="dropdown-toggle" href="#" data-toggle="dropdown">
                  <i className="icon feather icon-bell"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right notification">
                  <div className="noti-head">
                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                    <div className="float-right">
                      <a href="#!" className="m-r-10">
                        mark as read
                      </a>
                      <a href="#!">clear all</a>
                    </div>
                  </div>
                  <ul className="noti-body">
                    <li className="n-title">
                      <p className="m-b-0">NEW</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>John Doe</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              5 min
                            </span>
                          </p>
                          <p>New ticket Added</p>
                        </div>
                      </div>
                    </li>
                    <li className="n-title">
                      <p className="m-b-0">EARLIER</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-2.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              10 min
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Sara Soudein</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              12 min
                            </span>
                          </p>
                          <p>currently login</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-2.jpg"
                          alt=""
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              30 min
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="noti-footer">
                    <a href="#!">show all</a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              {user && (
                <div className="dropdown drp-user">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="feather icon-user"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right profile-notification">
                    <div className="pro-head">
                      <img
                        src={
                          user.UserPicUrl
                            ? IMG_URL + user?.UserPicUrl
                            : "https://bootdey.com/img/Content/avatar/avatar7.png"
                        }
                        className="img-radius"
                        alt=""
                      />
                      <span style={{ textAlign: "center" }}>
                        {user?.FullName}
                        <br />
                        {ROLES.find((item) => item.value === user?.roles)?.text}
                      </span>
                      <span></span>

                      <Link href="/">
                        <a
                          className="dud-logout"
                          title=" Logout"
                          onClick={logOut}
                        >
                          <i className="feather icon-log-out"></i>
                        </a>
                      </Link>
                    </div>
                    <ul className="pro-body">
                      <li>
                        <Link
                          href={`/user/user-profile?userId=${user?.UserId}`}
                          passHref
                        >
                          <a className="dropdown-item" title="My Profile">
                            <i className="feather icon-user"></i> My Profile
                          </a>
                        </Link>
                      </li>
                      -
                      <li>
                        <Link
                          href={`/user/user-subscription-list?userId=${user?.UserId}`}
                          passHref
                        >
                          <a className="dropdown-item" title=" My Subscription">
                            <i className="feather icon-box"></i> My Subscription
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/my-messages/${user?.UserId}`} passHref>
                          <a className="dropdown-item" title=" My Messages">
                            {" "}
                            <i className="feather icon-mail"></i> My Messages
                          </a>
                        </Link>
                      </li>
                      {/* <li>
                        <a href="#" className="dropdown-item" onClick={LogOut}>
                          <i className="feather icon-lock"></i> Lock Screen
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default TopHeaderBar;
