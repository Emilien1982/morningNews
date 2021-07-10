export default (language='fr', action) => {
  if (action.type === 'addLanguage') {
    //console.log('LANG IN REDUC: ', action.language);
    return action.language;
  }
  return language;
}