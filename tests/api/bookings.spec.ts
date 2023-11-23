import { expect, test } from "@playwright/test";
import { Authentication } from "../../api/auth";
import { Booking } from "../../api/booking";
import { BookingData } from "../../data/Booking";
import data from "../../data/json/booking.json";
import partialData from "../../data/json/partialBooking.json";

test.describe.only("Bookings", () => {
  let auth: Authentication;
  let booking: Booking;
  let bookingData: BookingData;

  test.beforeAll(async () => {
    bookingData = Object.assign(new BookingData(), data);
  });

  test("User should be able to create a booking", async ({ request }) => {
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

  //hardcoded id

  test("Admin should be able to modify a booking", async ({ request }) => {
    auth = new Authentication(request);
    booking = new Booking(request);
    await auth.createToken("admin", "password123");
    const token = auth.getAuthToken();
    const modifyBookingResponse = await booking.updateBooking(
      1,
      token,
      partialData
    );
    console.log(await modifyBookingResponse.json());
    console.log(await modifyBookingResponse.url());

    expect(await modifyBookingResponse.ok()).toBeTruthy();

    const modifyBookingBody = await modifyBookingResponse.json();
    expect(modifyBookingBody).toEqual(expect.objectContaining(partialData));

    const getBookingResponse = await booking.getBookingById(1);
    const getBookingBody = await getBookingResponse.json();
    expect(getBookingBody).toEqual(modifyBookingBody);
  });
});
