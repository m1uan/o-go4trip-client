


/**
 * Slu�ba poskytuj�ca pr�stup k r�znym nastaveniam aplik�cie.
 */
export class SettingsService {
  private _token : string;

  public login(user){
      this._token = user.access_token;
  }

  get token(){
    return this._token;
  }

  public get API_SERVER_URL() : string {

    // global variable from webpack
    // /confing/webpack.dev.js -> DefinePlugin
    return API_SERVER_URL;
  }

  public get API_SERVER_MOCK() : boolean {
    // global variable from webpack
    // /confing/webpack.dev.js -> DefinePlugin
    return API_SERVER_MOCK;
  }
}