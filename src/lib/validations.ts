const numberRegex = /^-?\d+([.]\d+)?$/

export const isNumber = (val: string) => numberRegex.test(val)
