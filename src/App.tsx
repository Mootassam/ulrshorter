import "./App.css";
import "firebase/compat/auth";
import "firebase/compat/database";
import { auth, provider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
function App() {
  const [user] = useAuthState(auth);

  const getFirstName = (fullName:any) => {
    const namePart = fullName.split(" ");
    if (namePart.length > 0) {
      return namePart[0];
    }
    return fullName;
  };

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error);
    }
  };
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__left">
          <img src="/logo.png" alt="" width={110} height={46} />
        </div>
        <div className="app__center"></div>
        <div className="app__right">
          {user ? (
            <div className="user__name">
              <div className="name__left">
                <span className="welcome"> Welcome</span>
                <span className="user__loginame">
                  {getFirstName(user.displayName)}
                </span>
              </div>
              <div className="name__right">
                <label htmlFor="toggleDropdown" className="name__right-label">
                  <img src="/down.png" alt="" />
                </label>
              </div>
              <div className="dropdwon">
                <div onClick={signOut}>
                  <label className="signout">Sign Out</label>
                </div>
              </div>
            </div>
          ) : (
            <div className="app__login" onClick={signIn}>
              Login
            </div>
          )}

          <div className="app__register"> Register</div>
        </div>
      </div>

      <div className="app__content">
        <div className="content__title">
          <h1>Shorten Your Loooong Links :)</h1>
          <span className="content__span">
            Linkly is an efficient and easy-to-use URL shortening service that
            streamlines your online experience.
          </span>
        </div>
        <div className="content__search">
          <div className="input__short">
            <div className="short__left">
              <img src="/link.png" alt="" />
              <input type="text" className="url__short" />
            </div>
            <div className="short__now">Shorten Now!</div>
          </div>
        </div>
        <span className="small__description">
          You can create{" "}
          <label htmlFor="" className="red">
            05{" "}
          </label>{" "}
          more links. Click here
        </span>
      </div>

      <div className="app__table">
        <table>
          <thead>
            <tr className="tr__">
              <td>Short Link</td>
              <td>Original Link</td>
              <td>QR Code</td>
              <td>Clicks</td>
              <td>Status</td>
              <td className="date__">
                Date
                <img src="/date.png" alt="" />
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="td__detail">
                https://linkly.com/Bn41aCOlnxj
                <div className="copy">
                  <img src="/copy.png" alt="" />
                </div>
              </td>
              <td>https://www.twitter.com/tweets/8erelCoihu/</td>
              <td>
                <img src="/qrcode.png" alt="" />
              </td>
              <td>1313</td>
              <td className="status">
                <span className="active">Active</span>
                <div className="link__active">
                  <img src="/link1.png" alt="" />
                </div>
              </td>
              <td>Oct - 10 -2023</td>
            </tr>
            <tr>
              <td className="td__detail">
                https://linkly.com/Bn41aCOlnxj
                <div className="copy">
                  <img src="/copy.png" alt="" />
                </div>
              </td>
              <td>https://www.twitter.com/tweets/8erelCoihu/</td>
              <td>
                <img src="/qrcode.png" alt="" />
              </td>
              <td>1313</td>
              <td className="status">
                <span className="inactive">Inavtive</span>
                <div className="link__active">
                  <img src="/unlink.png" alt="" />
                </div>
              </td>
              <td>Oct - 10 -2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
