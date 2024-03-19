export default class SessionStorage {
  constructor() {}

  setStorage(itemName, value) {
    sessionStorage.setItem(itemName, value);
  }
  getStorage(itemName) {
    const item = sessionStorage.getItem(itemName);
    return JSON.parse(item);
  }
  deleteStorage(name) {
    delete localStorage['name'];
  }
}
