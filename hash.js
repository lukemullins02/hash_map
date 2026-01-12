import LinkedList from "./linked.js";

class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  size = 0;

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
      this.size++;
    } else {
      this.arr[hashCode].append(key, value);
      this.size++;
    }
  }

  log(key) {
    const hashCode = this.hash(key);

    console.log(this.arr[hashCode].toString());
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
        return true;
      }
      temp = temp.nextNode;
    }

    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.arr[hashCode] === undefined) {
      throw new Error("Trying to access non-existent index");
    }

    if (this.arr[hashCode].first.key === key) {
      this.arr[hashCode].first = this.arr[hashCode].first.nextNode;
      this.size--;
      return true;
    }

    let temp = this.arr[hashCode].first.nextNode;
    let prev = this.arr[hashCode].first;
    let node;

    while (temp != null) {
      if (key === temp.key) {
        node = prev;
        break;
      }

      prev = temp;
      temp = temp.nextNode;
    }

    if (node !== undefined) {
      let secondNode = node.nextNode;
      node.nextNode = secondNode.nextNode;
      secondNode.nextNode = null;
      this.size--;

      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.size;
  }

  clear() {
    this.arr = [];
    this.capacity = 16;

    return this.arr;
  }

  keys() {
    let arrKeys = [];

    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i] !== undefined) {
        let temp = this.arr[i].first;
        while (temp) {
          arrKeys.push(temp.key);
          temp = temp.nextNode;
        }
      }
    }

    return arrKeys;
  }
}

const hash = new HashMap();

hash.set(12, 7);
hash.set("qr", 1);
hash.set("ab", 5);
hash.set(120, 55);

hash.set(12, 1);

const arr = hash.keys();
console.log(arr);

export default HashMap;
