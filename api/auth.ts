import { APIRequestContext, expect } from "@playwright/test";

export class Authentication {
  private request: APIRequestContext;
  private authToken: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async createToken(username: string, password: string) {
    const response = await this.request.post("/auth", {
      data: {
        username: username,
        password: password,
      },
    });
    expect(await response.ok()).toBeTruthy();
    const responseBody = await response.json();
    this.setAuthToken(responseBody.token);
    console.log(response.url());
  }

  private setAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * Get auth token
   */
  public getAuthToken() {
    return this.authToken;
  }
}
