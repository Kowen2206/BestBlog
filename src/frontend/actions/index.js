import axios from 'axios';
import useDeleteFromLocalStorage from '../hooks/useDeleteFromLocalStorage';

/* ------------------AUTH------------------------- */

export const registerhttp = (redirectUrl, payload) => {
  return (dispatch) => {
    const form = new FormData();
    form.append("Image", payload.photo);
    dispatch(showWindowMessage({ message: "Cargando...", title: "Espera un momento" }));
    axios.post('/db/uploadImage', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((data) => {
      axios.post("/auth/sign-up", { ...payload, photo: data.data.url }).
        then((res) => {
          const error = res.data;
          if (!error.err) {
            setTimeout(() => {
              dispatch(showWindowMessage({ message: "", title: "" }));
              window.location.href = redirectUrl;
            }, 3000);
          } else {
            dispatch(showWindowMessage({ message: error.err, title: "Error" }));
          }
        })
        .catch(() => {
          dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" }));
        });
    });
  }
}

export const sigInhttp = (redirectUrl, { email, password }) => {
  return (dispatch) => {
    dispatch(showWindowMessage({ message: "Cargando...", title: "Espera un momento" }));
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password
      },
    }).then(({ data }) => {
      document.cookie = `email=${data.user.email}; path=/`;
      document.cookie = `name=${data.user.name}; path=/`;
      document.cookie = `id=${data.user.id}; path=/`;
      document.cookie = `photo=${data.user.photo}; path=/`;
      dispatch(signIn({ data }));
    }).then(() => setTimeout(() => {
        dispatch(showWindowMessage({ message: "", title: "" }));
        window.location.href = redirectUrl;
      }, 3000))
      .catch((err) => {
        dispatch(showWindowMessage({ message: "Error al iniciar sesión", title: "Error" }));
      });
  }
}

export const registerUser = () => {
  return {
    type: "registerUser",
    payload
  }
}

export const signIn = (payload) => {
  return {
    type: "signIn",
    payload
  }
}

export const LogOut = () => {
  return {
    type: "LogOut",
    payload: []
  }
}

export const saveArticle = payload => {
  return {
    type: "saveArticle",
    payload
  }
}

/* ------------------USER------------------------- */
export const getUserArticles = (payload) => {
  return (dispatch) => {
    axios.post("/articles/get-user-articles", { userId: payload })
  }
}

export const updateUserAction = (user) => {

  return (dispatch) => {
    dispatch(showWindowMessage({ message: "Cargando...", title: "Espera un momento" }));
    let values = Object.keys(user);

    for (let i = 0; i < values.length; i++) {
      if (user[values[i]] === "" || user[values[i]] === null) {
        delete user[values[i]]
      }
    }
    if (user.photo) {
      const form = new FormData();
      form.append("Image", user.photo);
      dispatch(showWindowMessage({ message: "Cargando...", title: "Espera un momento" }));
      axios.post('/db/uploadImage', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((data) => {
        
        axios.post(`/user/update`, {...user, photo: data.data.url})
        .then((res) =>{
          const error = res.data;
          if (!error.err) {

          document.cookie = `photo=${ data.data.url}`
          window.setTimeout(() => {
            dispatch(showWindowMessage({ message: "", title: "" }));
          }, 3000)

        }else{
          dispatch(showWindowMessage({ message: error.err, title: "Error" }));
        }
        
        })
        .catch(() => { dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" }));});

      })
      .catch(() => { dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" })); });

    } else {
      axios.post(`/user/update`, user)
        .then((res) =>
          {
            const error = res.data;
            if (!error.err) {
              window.setTimeout(() => {
                dispatch(showWindowMessage({ message: "", title: "" }));
              }, 3000)
    
            }else{
              dispatch(showWindowMessage({ message: error.err, title: "Error" }));
            }

          })
        .catch(() => { dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" })); });
    }
  }
}

/* ------------------ARTICLES------------------------- */


//cargar un unico articulo apartir de su id y un type, el cual decide que action ejecutar
export const loadArticle = payload => {
  return (dispatch) => {
    axios.post('/article/get-one', payload )
      .then(data => {
        dispatch(injectArticle(data.data));
      })
      .catch(err => { dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" })); });
  }
}

// Inyecta el contenido de un articulo (titulo, contenido, autor etc.) a el state del store
export const injectArticle = (payload) => {
  return {
    type: "injectArticle",
    payload
  }
}

const removeArticleFromState = (payload) => {
  return { type: "deleteArticle", payload }
}

export const createArticle = (payload) => {
  return (dispatch) => {
    dispatch(showWindowMessage({ message: "Cargando...", title: "Espera un momento" }));
    axios.post('/article/create', payload)
      .then(() => {
        const removeArticle = useDeleteFromLocalStorage();
        removeArticle();
      })
      .then(() =>
        window.setTimeout(() => {
          dispatch(showWindowMessage({ message: "", title: "" }));
          window.location.href = "/Home"
        }, 3000))
      .catch((err) => {
        dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" }));
      });
  }
}

export const deleteArticle = (idArticle) => {
  return (dispatch) => {
    axios.post('/article/delete', { idArticle })
      .then(() => {
        dispatch(removeArticleFromState(idArticle))
      })
      .catch(res => dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" })));
  }
}

export const updateArticle = ({ payload, id }) => {
  return (dispatch) => {
    dispatch(showWindowMessage({ message: "Cargando...", title: "Espera un momento" }));
    axios.post(`/article/update`, { id, payload })
      .then(() => {
        const removeArticle = useDeleteFromLocalStorage();
        removeArticle();
      })
      .then(() => window.setTimeout(() => {
        dispatch(showWindowMessage({ message: "", title: "" }));
        window.location.href = "/Home"
      }, 3000))
      .catch((err) => {
        dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" }));
      });
  }
}

export const saveTemporalArticle = (payload) => {
  return () => {
    const { article } = payload || "";
  }
}

/* ------------------IMAGES------------------------- */


export const uploadImage = (payload) => {
  const { key, photo } = payload;
  return (dispatch) => {
    const form = new FormData();
    form.append("Image", photo);
    axios.post('/db/uploadImage', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(data => {
      window.localStorage.setItem(key, data.data.url);
    }).catch(() => dispatch(showWindowMessage({ message: 'Error interno, intentalo más tarde', title: "Error" })));
  }
}

export const showWindowMessage = (payload) => {
  return {
    type: "showWindowMessage",
    payload
  }
}
