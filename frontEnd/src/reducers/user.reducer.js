export default (token='', action) => {
  if (action.type === 'addToken') {
    return action.token;
  }
  return token;
}