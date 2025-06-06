export function handleEvent(e: KeyboardEvent, method: Function) {
  if (e.code === 'Enter') {
    method();
  }
}
