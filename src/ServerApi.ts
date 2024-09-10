/**
 * Что было плохо: Метод fetch не имел явного определения типа, что затрудняло его использование и понимание.
 * Что стало лучше: Метод fetch теперь определен с типом HttpMethod для HTTP-методов и включает обработку ошибок и проверку ответов.
 *
 * Что было плохо: HTTP-методы передавались как строки, что могло привести к ошибкам.
 * Что стало лучше: Введено перечисление HttpMethod.
 */

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface TAccount {}

interface TCredentials {}

class ServerApi {
  private async fetch(method: HttpMethod, url: string, body?: any): Promise<any> {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method === HttpMethod.GET ? undefined : JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  }

  public processAddAccountRequest(url: string, account: TAccount): Promise<any> {
    return this.fetch(HttpMethod.POST, url, account);
  }

  public sendDeleteAccountRequest(url: string, accountId: string): Promise<any> {
    return this.fetch(HttpMethod.DELETE, url, { id: accountId });
  }

  public requestAuth(url: string, credentials: TCredentials): Promise<any> {
    return this.fetch(HttpMethod.GET, url, credentials);
  }
}
