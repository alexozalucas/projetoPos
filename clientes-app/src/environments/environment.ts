export const environment = {

  production: false,
  API_BASE_URL: 'http://localhost:8080',
  API_URL: "http://localhost:8080/api/",
  AUTH_API: "http://localhost:8080/api/auth/",
  GOOGLE_AUTH_URL: "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:4200/login",
  //production: true,
  //API_BASE_URL: 'https://servicosprestados.herokuapp.com',
  //API_URL: "https://servicosprestados.herokuapp.com/api/",
  //AUTH_API: "https://servicosprestados.herokuapp.com/api/auth/",
  //GOOGLE_AUTH_URL: "https://servicosprestados.herokuapp.com/oauth2/authorization/google?redirect_uri=https://prestacaoservicos.netlify.app",
  //GOOGLE_AUTH_URL: "http://localhost:8080/oauth2/authorization/google?redirect_uri=https://prestacaoservicos.netlify.app",
  ClientId: 'my-angular-app',
  clientSecret: '@321',
  obterTokenUrl: '/oauth/token',


};

