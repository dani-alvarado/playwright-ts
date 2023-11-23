import { request, test } from "@playwright/test";

test.describe("Reporting PoC", () => {
  test("This test must be skipped - poc", async ({ request }) => {
    test.skip();
  });

  test("This test must fail - poc", async ({ request }) => {
    test.fail();
  });
});
