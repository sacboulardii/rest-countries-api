export default function (population: any) {
  if (population) {
    return population.toLocaleString('en-US')
  }
  return '0'
}
