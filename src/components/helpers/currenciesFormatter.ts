export default function (currencies: any) {
  return (
    currencies &&
    Object.values(currencies)
      .map((currency: any) => currency.name)
      .join(', ')
  )
}
