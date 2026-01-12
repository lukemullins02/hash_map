class HashMap {
  loadFactor = 0.75;
  capacity = 16;

  constructor() {
    this.arr = [];
  }

  hash(key) {
    let hashCode = 0;

    if (!isNaN(key)) {
      key = String(key);
    }

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  get(key) {
    if (key < 0 || key >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.arr[key];
  }
}

const hash = new HashMap();

console.log(hash.get(17));
