export function registerUser({ username, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && email && password) {
        resolve({ id: Date.now(), username, email });
      } else {
        reject(new Error('Invalid data'));
      }
    }, 700);
  });
}
