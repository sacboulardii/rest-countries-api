export default function (nativeName: any) {
  return (
    nativeName &&
    [
      ...new Set(
        Object.values(nativeName).map((nativeName: any) => nativeName.common)
      ),
    ].join(', ')
  )
}
