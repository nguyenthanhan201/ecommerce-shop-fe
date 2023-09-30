export function isEmpty(value: string | Array<unknown> | object | null | undefined) {
  if (typeof value === 'string') {
    return value.trim() === '';
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0;
  } else {
    return true; // Treat all other types as empty
  }
}
