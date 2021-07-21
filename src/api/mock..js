import data from '../data.json';

export const getData = (text) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const filteredData = data.filter(el => el.title.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        resolve(filteredData);
      }catch (e) {
        reject(e);
      }
    }, 1000)
  })
}
