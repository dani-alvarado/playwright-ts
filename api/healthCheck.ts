import { APIRequestContext } from "@playwright/test";

export class HealthCheck {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async healthCheck() {
    const response = await this.request.get("/ping");
    return await response;
  }
}
