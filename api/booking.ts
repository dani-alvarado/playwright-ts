import { APIRequestContext, expect } from "@playwright/test";

export class Booking {
  private request: APIRequestContext;
  private authToken: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async getBookingIds() {
    const response = await this.request.get("/booking");
    expect(await response.ok()).toBeTruthy();
    return response;
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
