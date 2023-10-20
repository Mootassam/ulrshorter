import React, { useEffect, useState } from "react";
import "./shorLink.css";
import "firebase/compat/auth";
import "firebase/compat/database";
import { auth, database, provider } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  generateShortLink,
  generateShortMulti,
  showLinks,
} from "../../store/shortLink/shortLinkActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  fetchLoading,
  hasRows,
  listLinks,
  multiLoading,
  shortLoading,
} from "../../store/shortLink/shortLinkSelectors";
import LinkTable from "../TableView/LinkTable";
import { Toaster } from "react-hot-toast";

function ShortLink() {
  const [user] = useAuthState(auth);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const [url, setUrl] = useState<string>();
  const [show, setShow] = useState(false);
  const loadingLinks = useSelector(fetchLoading);
  const allLinks = useSelector(listLinks);
  const coutRows = useSelector(hasRows);
  const shortLoadign = useSelector(shortLoading);
  const loadingMulti = useSelector(multiLoading);
  const [form, setNewform] = useState<{ link: string }[]>([
    {
      link: "",
    },
  ]);
  const addFields = () => {
    setNewform([
      ...form,
      {
        link: "",
      },
    ]);
  };
  const removeFields = (index: number) => {
    let formDelete = [...form];
    formDelete.splice(index, 1);
    setNewform(formDelete);
  };

  const FetchLinks = async () => {
    await dispatch(showLinks([]));
  };

  useEffect(() => {
    FetchLinks();
  }, []);

  const showLink = () => {
    setShow(true);
  };

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

  const generateShortUrl = async (url: string) => {
    dispatch(generateShortLink(url));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let formN = [...form];
    formN[i] = { ...formN[i], [event.target.name]: event.target.value };
    setNewform(formN);
  };

  const SaveMultiLinks = async () => {
    dispatch(generateShortMulti(form));
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
                typeof="url"
                required
                placeholder="Enter the link here"
              />
            </div>
            <div
              className="short__now"
              onClick={() =>
                generateShortUrl(
                  "https://medium.com/@aleemuddin13/how-to-host-static-website-on-firebase-hosting-for-free-9de8917bebf2"
                )
              }
            >
              {!shortLoadign && <>Shorten Now!</>}

              {shortLoadign && (
                <div className="shorten">
                  Shorten ... <div className="spinners"></div>{" "}
                </div>
              )}
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

      <LinkTable
        allLinks={allLinks}
        loading={loadingLinks}
        hasRows={coutRows}
      />

      {show && (
        <div className="app__sidebar">
          <div className="content__plus">
            <div className="plus__link" onClick={() => addFields()}>
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <div className="sidebar__content">
            {form.map((item, index) => (
              <div className="content__" key={index}>
                <div className="circle">{index + 1}</div>
                <div className="more__links">
                  <div>
                    <img src="/link.png" alt="" />
                  </div>
                  <input
                    type="text"
                    className="more__link"
                    name="link"
                    value={item.link}
                    placeholder="Enter the link here"
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </div>
                {index ? (
                  <div className="cancel" onClick={() => removeFields(index)}>
                    <i className="fa-solid fa-minus"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>

          <div className="sidebar__bottom">
            <div className="sidebar__save">
              <div className="cancel__now" onClick={() => setShow(false)}>
                Cancel Now!
              </div>
              <div className="save__now" onClick={SaveMultiLinks}>
                {!loadingMulti && <>Save Now!</>}
                {loadingMulti && (
                  <div className="shorten">
                    Shorten ... <div className="spinners"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="app__footer"></div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ShortLink;
