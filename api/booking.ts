import { APIRequestContext } from "@playwright/test";
import { BookingData } from "../data/Booking";

export class Booking {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async getBookingIds(
    firstName?: string,
    lastName?: string,
    checkIn?: string,
    checkOut?: string
  ) {
    let response;
    if (
      typeof firstName != null ||
      typeof lastName != null ||
      typeof checkIn != null ||
      typeof checkOut != null
    ) {
      response = await this.request.get("/booking", {
        params: {
          firstname: firstName || "",
          lastname: lastName || "",
          checkin: checkIn || "",
          checkout: checkOut || "",
        },
      });
    } else {
      response = await this.request.get("/booking");
    }

    return await response;
  }

  public async getBookingById(id: number) {
    const response = await this.request.get(`/booking/${id}`);
    return response;
  }

  public async createBooking(data: BookingData) {
    const response = await this.request.post("/booking", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        totalprice: data.totalprice,
        depositpaid: data.depositpaid,
        bookingdates: data.bookingdates,
        additionalneeds: data.additionalneeds,
      },
    });
    return await response;
  }
}
