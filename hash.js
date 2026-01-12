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

    console.log(hashCode);

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.arr[hashCode] !== undefined) {
      if (this.arr[hashCode].first.key === key) {
        this.arr[hashCode].first.value = value;
        return;
      }

      let temp = this.arr[hashCode].first.nextNode;

      if (temp != null) {
        while (temp.nextNode != null) {
          if (temp.key === key) {
            temp.value = value;
            return;
          }
          temp = temp.nextNode;
        }

        if (temp.key === key) {
          temp.value = value;
          return;
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

hash.set(12, 1);
hash.set("qr", 1);
hash.set("ab", 2);
hash.set("ab", 3);
hash.set("qr", 19);
hash.set(12, 5);

hash.set("Luke", 1);
hash.set("Luke", 5);

export default HashMap;
