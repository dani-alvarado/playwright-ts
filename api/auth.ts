import { APIRequestContext, expect } from "@playwright/test";

export class Authentication {
  private request: APIRequestContext;
  private authToken: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async createToken(username: string, password: string) {
    const response = await this.request.post("/auth", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    });
    const responseBody = await response.json();
    expect(await response.ok()).toBeTruthy();
    this.setAuthToken(await responseBody.token);
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
