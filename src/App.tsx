import React, { useEffect, useState } from "react";
import "./App.css";
import "firebase/compat/auth";
import "firebase/compat/database";
import { auth, database, provider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import Date from "./modules/shared/date";
import ClipboardJS from "clipboard";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import QRCode from "react-qr-code";

function App() {
  const [user] = useAuthState(auth);
  const [url, setUrl] = useState();
  const [links, setLinks] = useState<any>();
  const [copySuccess, setCopySuccess] = useState(false);
  const [selected, setSelectedItem] = useState<any>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const q = query(collection(database, "links"), orderBy("date", "desc")); // Change "timestamp" to the actual field you want to use for ordering

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLinks(newData);
    });

    return () => {
      // Unsubscribe when the component unmounts to avoid memory leaks
      unsubscribe();
    };
  }, []);

  const handleCopy = (value: any, index: number) => {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopySuccess(true);
    setSelectedItem(index);

    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const showLink = () => {
    setShow(true);
  };
  useEffect(() => {
    // This will log the data after it has been fetched.
  }, [links]);
  const getFirstName = (fullName: any) => {
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

  const handletext = (event: any) => {
    const value = event.target.value;
    setUrl(value);
  };
  const shortLink = () => {
    axios
      .post(
        "https://api.tinyurl.com/create",
        {
          url: url,
        },
        {
          headers: {
            "content-type": "text/json",

            Authorization:
              "Bearer Jm0FUupFHrdPTjr677duNq7vjai0KpK93es3nAM4xPPjZ9g04IlihEB76JMS",
          },
        }
      )
      .then(async (res) => {
        try {
          const docRef = await addDoc(collection(database, "links"), {
            date: Date.createdAt(),
            originallink: url,
            shortlink: res.data.data.tiny_url,
            status: "active",
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__left">
          <img src="/logo.png" alt="" width={110} height={40} />
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
              <div className="dropdwon" onClick={signOut}>
                <label className="signout">Sign Out</label>
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
              <input
                type="text"
                className="url__short"
                onChange={() => handletext(event)}
              />
            </div>
            <div className="short__now" onClick={shortLink}>
              Shorten Now!
            </div>
          </div>
        </div>
        <span className="small__description">
          You can create{" "}
          <label htmlFor="" className="red">
            05{" "}
          </label>{" "}
          more links.{" "}
          <div className="clickhere" onClick={showLink}>
            {" "}
            Click here{" "}
          </div>
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
            {links?.map((item: any, i: number) => (
              <tr key={i}>
                <td className="td__detail">
                  {item.shortlink}
                  <div
                    className={`copy ${
                      copySuccess && selected === i ? "copied" : ""
                    }`}
                    onClick={() => handleCopy(item.shortlink, i)}
                  >
                    <img src="/copy.png" alt="" />
                  </div>
                </td>
                <td className="original__link">{item.originallink}</td>
                <td>
                  <div
                    style={{
                      height: "auto",
                      maxWidth: 40,
                      width: "100%",
                    }}
                  >
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={item.shortlink}
                      viewBox={`0 0 256 256`}
                      bgColor="#73767c"
                    />
                  </div>
                </td>
                <td>1313</td>
                <td className="status">
                  <span className="active">{item.status}</span>
                  <div className="link__active">
                    <img src="/link1.png" alt="" />
                  </div>
                </td>
                <td>{Date.format(item.date)}</td>
              </tr>
            ))}

            {/* <tr>
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
            </tr> */}
          </tbody>
        </table>
      </div>
      {show && (
        <div className="app__sidebar">
            <div className="content__plus">
              <div className="plus__link">
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          <div className="sidebar__content">

            {Array.from({ length: 27 }).map((item, index) => (
              <div className="content__">
                <div className="circle">{index + 1}</div>
                <div className="more__links">
                  <div>
                    <img src="/link.png" alt="" />
                  </div>
                  <input
                    type="text"
                    className="more__link"
                    placeholder="Enter the link here"
                  />
                </div>
                <div className="cancel">
                  <i className="fa-solid fa-minus"></i>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar__bottom">
            <div className="sidebar__save">
              <div className="cancel__now" onClick={() => setShow(false)}>
                Cancel Now!
              </div>
              <div className="short__now">Save Now!</div>
            </div>
          </div>
        </div>
      )}

      <div className="app__footer"></div>
    </div>
  );
}

export default App;
