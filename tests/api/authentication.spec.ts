import { request, test } from "@playwright/test";
import { Authentication } from "../../api/auth";

let authToken: string;
let auth: Authentication;

test.describe("Authentication", () => {
  test("User should be authenticated", async ({ request }) => {
    auth = new Authentication(request);

    await auth.createToken("admin", "password123");

    authToken = auth.getAuthToken();
    console.log(authToken);
  });
});
