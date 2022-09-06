export default function (languages: string[]) {
  return languages && Object.values(languages).join(', ')
}
