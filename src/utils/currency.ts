function formatMXNCurrency(amount: number) {
  return Intl.NumberFormat(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ).format(amount);
}

export {
  formatMXNCurrency
}