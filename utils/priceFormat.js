const priceFormat = (amount) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  })
    .format(amount)
    .replace(".00", "");

export default priceFormat;
