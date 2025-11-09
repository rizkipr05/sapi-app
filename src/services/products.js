function delay(ms = 300) { return new Promise(r => setTimeout(r, ms)); }

const DATA = [
  { id: '1', title: 'Sapi Ongole',   price: 23000000, img: 'https://images.pexels.com/photos/1430627/pexels-photo-1430627.jpeg' },
  { id: '2', title: 'Sapi Holstein', price: 25000000, img: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg' },
  { id: '3', title: 'Sapi Red Poll', price: 35000000, img: 'https://images.pexels.com/photos/158603/cow-calf-cattle-yellow-158603.jpeg' },
  { id: '4', title: 'Sapi Red Danish', price: 30000000, img: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg' },
  { id: '5', title: 'Sapi Bali',     price: 21000000, img: 'https://images.pexels.com/photos/158337/cow-cattle-livestock-158337.jpeg' },
  { id: '6', title: 'Sapi Limousin', price: 40000000, img: 'https://images.pexels.com/photos/422211/pexels-photo-422211.jpeg' }
];

export async function listProducts() {
  await delay();
  return DATA;
}
