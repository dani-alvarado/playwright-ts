import { expect, test } from "@playwright/test";
import { Authentication } from "../../api/auth";
import { Booking } from "../../api/booking";
import { BookingData } from "../../data/Booking";
import data from "../../data/json/booking.json";

test.describe.only("Bookings", () => {
  let auth: Authentication;
  let booking: Booking;
  let bookingData: BookingData;

  test.beforeAll(async ({ request }) => {
    bookingData = Object.assign(new BookingData(), data);
  });

  test("User should be able to create a booking", async ({ request }) => {
    auth = new Authentication(request);
    booking = new Booking(request);
    const createBookingResponse = await booking.createBooking(bookingData);

    expect(await createBookingResponse.ok()).toBeTruthy();

    const newBookingResponseBody = await createBookingResponse.json();
    const bookingId = newBookingResponseBody.bookingid;
    const newBooking = newBookingResponseBody.booking;

    expect(bookingId).not.toBeEmpty;

    (Object.keys(newBooking) as (keyof typeof newBooking)[]).forEach((key) => {
      expect(newBooking[key]).toEqual(bookingData[key]);
    });
  });
});
