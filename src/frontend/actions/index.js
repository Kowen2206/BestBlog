import axios from 'axios';

export const saveArticle = payload => {
  return {
    type: "saveArticle",
    payload
  }
}

export const loadArticle = payload =>{
  return (dispatch) =>{
      console.log("LoadArticle")
      axios.post('/api/article', {payload})
      .then(data =>{
        console.log("data");
        console.log(data.data)
        dispatch(injectArticle(data.data))
        
      })
      .catch(err => {  console.log("err"); console.log(err)});
  }
}

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
  console.log("ALGO");
  console.log(payload);
  return (dispatch) => {
        axios.post('/api/articles/createArticle', payload)
        .then( () =>{
        window.sessionStorage.removeItem("articleContent");
        window.sessionStorage.removeItem("articleTitle");
        window.sessionStorage.removeItem("articleImage");})
        .then( () => window.setTimeout(() =>window.location.href = "/Home", 1000))
        .catch((err) => { 
          const message = "Error al crear el articulo";
          console.log(message);
          console.log(err); 
        });
  }
}

export const deleteArticle = (idArticle) =>{
  return (dispatch) =>{
      console.log(idArticle)
      axios.post('/api/deleteArticle', {idArticle})
      .then(() => {
        console.log("DeleteArticle")
        console.log(idArticle)
        dispatch(removeArticleFromState(idArticle))})
      .catch(res=> console.log("err \n" + res));
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
      catch((err) => { console.log("here is an error" + err) });
    });
  }
}

export const sigInhttp = (redirectUrl, { email, password }) => {
  console.log(email, password)
  console.log("data aquí wey0")
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
      }).then(()=>window.location.href = redirectUrl)
      .catch((err) => {
        console.log(err)
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
      window.sessionStorage.setItem(key, data.data.url);
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
