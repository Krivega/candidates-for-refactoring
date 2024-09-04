// Нет реализации метода fetch
class ServerApi {
  public processAddAccountRequest(account: TAccount) {
    // end-point является частью апи, а не бизнес логики, потому не приходит в аргументе
    const url: string;
    return this.fetch('POST', url, account);
  }

  public sendDeleteAccountRequest(accountId: string) {
    // end-point является частью апи, а не бизнес логики, потому не приходит в аргументе
    const url: string;
    return this.fetch('DELETE', url, accountId);
  }

  public requestAuth(credentials: TCredentials) {
    // end-point является частью апи, а не бизнес логики, потому не приходит в аргументе
    const url: string;
    return this.fetch('GET', url, credentials);
  }
}
