import { isWeekend } from "./time.js";

export const defaultPricing = {
  weekdayPrice: 1200,
  weekendPrice: 1500,
  advanceAmount: 200,
  oneHourPrice: 700
};

export function calculateBookingAmount({ date, duration, paymentType, pricing = defaultPricing }) {
  const fullAmount =
    Number(duration) === 1
      ? pricing.oneHourPrice
      : isWeekend(date)
        ? pricing.weekendPrice
        : pricing.weekdayPrice;

  return paymentType === "ADVANCE" ? pricing.advanceAmount : fullAmount;
}
