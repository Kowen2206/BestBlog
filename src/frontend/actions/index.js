import axios from 'axios';

export const saveArticle = payload => {
  return {
    type: "saveArticle",
    payload
  }
}

export const loadArticle = payload =>{
  return (dispatch, getState) =>{
    console.log("LoadArticle")
      axios.post('/api/article', {payload}).

      then(data =>{
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

export const registerhttp = (redirectUrl, payload) => {
  return (dispatch) => {
    console.log("AXIO")
    console.log(payload)

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
  return (dispatch) => {

    console.log("AXIOs");
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password
      },
    })
      .then(({ data }) => {
        console.log("data aquí wey")
        console.log(data)
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`
        document.cookie = `id=${data.user.id}`
        document.cookie = `photo=${data.user.photo}`
        document.cookie = `token=${data.user.token}`
        dispatch(signIn({ data })).then(window.location.href = redirectUrl)
          .catch((err) => {
            console.log(err)
          });
      })
  }
}

export const createArticle = (payload, image) => {

  console.log("ALGO");
  return () => {

    const form = new FormData();
    form.append("Image", image);

    axios.post('/uploadImage', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(data => {
        console.log("data " + JSON.stringify(data.data));
        axios.post('/api/articles/createArticle', { ...payload, ArticlePhoto: data.data.url })
        .then(data => console.log(data)).then(window.location.href = "/Home")
        .catch(err => {console.log("err"); console.log(err);})

      })
      .catch((err) => { console.log("Create article action error: " + err) })
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
