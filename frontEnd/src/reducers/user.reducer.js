export default (token='', action) => {
  if (action.type === 'addToken') {
    //console.log('reducer token', action.token);
    return action.token;
  }
  return token;
}