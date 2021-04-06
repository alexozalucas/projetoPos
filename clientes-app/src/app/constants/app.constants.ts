import { environment } from '../../environments/environment'

export class AppConstants {
    
    //private static API_BASE_URL = 'http://localhost:8080';    
    private static OAUTH2_URL = environment.API_BASE_URL + "/oauth2/authorization/";
    private static REDIRECT_URL = "?redirect_uri=http://localhost:4200/login";
    public static API_URL = environment.API_BASE_URL + "/api/";
    public static AUTH_API = AppConstants.API_URL + "auth/";
    public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;

 
}