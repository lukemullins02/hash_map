import LinkedList from "./linked.js";

class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  length = 0;

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

  set(key, value) {
    const hashCode = this.hash(key);

    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.arr[hashCode] !== undefined) {
      let temp = this.arr[hashCode].first;

      if (temp != null) {
        while (temp) {
          if (temp.key === key) {
            temp.value = value;
            return;
          }
          temp = temp.nextNode;
        }
      }
    }

    if (this.arr[hashCode] === undefined) {
      this.arr[hashCode] = new LinkedList();
      this.arr[hashCode].append(key, value);
    } else {
      this.arr[hashCode].append(key, value);
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.arr[hashCode] === undefined) {
      throw new Error("Trying to access non-existent index");
    }

    let temp = this.arr[hashCode].first;

    while (temp) {
      if (temp.key === key) {
        return temp.value;
      }
      temp = temp.nextNode;
    }
  }

  has(key) {
    if (key < 0 || key >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.arr[key] !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}

const hash = new HashMap();

hash.set(12, 7);
hash.set("qr", 1);
hash.set("ab", 5);
hash.set("ab", 10);
hash.set("qr", 2);
hash.set(12, 100);

console.log(hash.get("ab"));
console.log(hash.get("qr"));
console.log(hash.get(12));

export default HashMap;
