import axios from 'axios';
import useDeleteFromLocalStorage from '../hooks/useDeleteFromLocalStorage';

export const saveArticle = payload => {
  return {
    type: "saveArticle",
    payload
  }
}

//cargar un unico articulo apartir de su id y un type, el cual decide que action ejecutar
export const loadArticle = payload =>{
  return (dispatch) =>{
      axios.post('/api/article', {payload})
      .then(data =>{
        dispatch(injectArticle(data.data)); 
      })
      .catch(err => {  console.log("err"); console.log(err)});
  }
}

// Inyecta un articulo a el state del store
export const injectArticle = (payload) =>{
  return{
    type: "injectArticle",
    payload
  }
}

const removeArticleFromState = (payload) =>{
  return{type: "deleteArticle", payload}
}

export const createArticle = (payload) => {
  return (dispatch) => {
        axios.post('/api/articles/createArticle', payload)
        .then( () =>{
         const removeArticle = useDeleteFromLocalStorage();
         removeArticle();
        })
        .then( () => window.setTimeout(() =>window.location.href = "/Home", 1000))
        .catch((err) => { 
          const message = "Error al crear el articulo";
          console.log(message);
          console.log(err.message); 
        });
  }
}

export const deleteArticle = (idArticle) =>{
  return (dispatch) =>{
      axios.post('/api/deleteArticle', {idArticle})
      .then(() => {
        dispatch(removeArticleFromState(idArticle))})
      .catch(res=> console.log("err \n" + res));
  }
}

export const updateArticle = ({payload, id}) =>{
  return (dispatch) => {
        axios.post(`/api/articles/updateArticle`, {id, payload})
       .then( () =>{
         const removeArticle = useDeleteFromLocalStorage();
         removeArticle();
        }) 
        .then( () => window.setTimeout(() =>window.location.href = "/Home", 1000))
        .catch((err) => { 
          const message = "Error al crear el articulo";
          console.log(message);
          console.log(err.message); 
        });
  }
}

export const saveTemporalArticle = (payload) =>{
  return () =>{
   const {article} = payload || "";
  }
}

export const registerhttp = (redirectUrl, payload) => {
  return (dispatch) => {
    const form = new FormData();
    form.append("Image", payload.photo);
    axios.post('/uploadImage', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((data) =>{
      axios.post("/auth/sign-up", {...payload, photo: data.data.url}).
      then(() => window.location.href = redirectUrl).
      catch((err) => { console.log("Error:" + err) });
    });
  }
}

export const sigInhttp = (redirectUrl, { email, password }) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password
      },
    }).then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`
        document.cookie = `id=${data.user.id}`
        document.cookie = `photo=${data.user.photo}`
        dispatch(signIn({ data }))
      })
      .then(()=>window.location.href = redirectUrl)
      .catch(() => {
        console.log("ERROR QUE NO DEBERIA MOSTRAR SOLO UN PUTA R")
        dispatch(showWindowError("Error al inciar sessión"))
      });
  }
}

export const uploadImage = (payload) =>{
const {key, photo} = payload;
return ()=>{
  const form = new FormData();
    form.append("Image", photo);
    axios.post('/uploadImage', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(data => {
      console.log("data " + JSON.stringify(data.data));
      window.localStorage.setItem(key, data.data.url);
   })
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

export const getUserArticles = (payload) =>{
  return (dispatch) =>{
    axios.post("/api/articles", {userId: payload})
  }
}

export const showWindowError = (payload) =>{
    return{
        type: "showWindowError",
        payload
    }
}
