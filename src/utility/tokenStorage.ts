const TOKEN = 'TOKEN';

export default {
  set(value: string) {
    localStorage.setItem(TOKEN, value);
  },
  get() {
    return localStorage.getItem(TOKEN);
  },
  remove() {
    localStorage.removeItem(TOKEN);
  },
};
