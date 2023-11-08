export function formatCPF(value: string) {
  let formattedValue = ''

  for (let i = 0; i < value.length; i++) {
    if (i === 3 || i === 6) {
      formattedValue += '.'
    } else if (i === 9) {
      formattedValue += '-'
    }
    formattedValue += value[i]
  }

  return formattedValue
}
