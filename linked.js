class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}
class LinkedList {
  first = null;

  append(key, value) {
    if (this.first === null) {
      this.prepend(key, value);
    } else {
      let temp = this.first;
      while (temp.nextNode != null) {
        temp = temp.nextNode;
      }
      temp.nextNode = new Node(key, value);
    }
  }

  prepend(key, value) {
    if (this.first == null) {
      this.first = new Node(key, value);
    } else {
      let temp = this.first;
      this.first = new Node(key, value);
      this.first.nextNode = temp;
    }
  }

  size() {
    if (this.first != null) {
      let temp = this.first;
      let sum = 0;
      while (temp.nextNode != null) {
        temp = temp.nextNode;
        sum++;
      }

      return ++sum;
    } else {
      return "Empty";
    }
  }

  head() {
    if (this.first != null) {
      return this.first.value;
    } else {
      return undefined;
    }
  }

  tail() {
    if (this.first.nextNode != null) {
      let temp = this.first.nextNode;
      while (temp.nextNode != null) {
        temp = temp.nextNode;
      }
      return temp.value;
    } else if (this.first != null) {
      return this.first.value;
    } else {
      return undefined;
    }
  }

  at(index) {
    if (this.head() != undefined) {
      if (index === 0) {
        return this.head();
      }

      if (index === this.size() - 1) {
        return this.tail();
      }

      let temp = this.first.nextNode;
      let i = 1;

      while (temp.nextNode != null) {
        if (i === index) {
          return temp.value;
        }
        i++;
        temp = temp.nextNode;
      }

      return undefined;
    } else {
      return undefined;
    }
  }

  pop() {
    if (this.first != null) {
      let temp = this.first;
      this.first = temp.nextNode;
      temp.nextNode = null;
      return temp.value;
    } else {
      return undefined;
    }
  }

  contains(value) {
    if (this.head() != null) {
      if (this.first.value === value) {
        return true;
      }

      if (this.tail() === value) {
        return true;
      }

      let temp = this.first.nextNode;
      while (temp.nextNode != null) {
        if (temp.value === value) {
          return true;
        }
        temp = temp.nextNode;
      }
    }

    return false;
  }

  findIndex(value) {
    if (this.head() != undefined) {
      let index = 0;
      if (this.head() === value) {
        return index;
      }

      if (value === this.tail()) {
        index = this.size() - 1;
        return index;
      }

      let temp = this.first.nextNode;
      index = 1;

      while (temp.nextNode != null) {
        if (temp.value === value) {
          return index;
        }
        index++;
        temp = temp.nextNode;
      }

      return undefined;
    } else {
      return undefined;
    }
  }

  toString() {
    if (this.head() != undefined) {
      let temp = this.first;
      let string = "";
      while (temp.nextNode != null) {
        string += `( ${temp.value} ) -> `;
        temp = temp.nextNode;
      }
      string += `( ${temp.value} ) -> null`;
      return string;
    } else {
      return "";
    }
  }

  insertAt(index, ...values) {
    let node;

    if (this.head() != undefined) {
      if (index === 0) {
        let prev = this.first;
        let temp;
        for (let i = 0; i < values.length; i++) {
          if (i === 0) {
            this.first = new Node(values[i]);
            temp = this.first;
          } else {
            temp.nextNode = new Node(values[i]);
            temp = temp.nextNode;
          }
        }
        temp.nextNode = prev;
        return;
      } else {
        if (index > this.size() - 1 || index < 0) {
          return "Out of Range";
        }

        let temp = this.first.nextNode;
        let prev = this.first;
        let i = 1;

        while (temp.nextNode != null) {
          if (i === index) {
            node = prev;
            break;
          }
          i++;

          prev = temp;
          temp = temp.nextNode;
        }

        if (i === this.size() - 1) {
          node = prev;
        }
      }
    } else {
      return undefined;
    }

    let prev = node.nextNode;

    for (let i = 0; i < values.length; i++) {
      node.nextNode = new Node(values[i]);
      node = node.nextNode;
    }

    node.nextNode = prev;
  }

  removeAt(index) {
    let node;

    if (this.head() === undefined) {
      return "No List";
    } else {
      if (index === 0) {
        this.first = this.first.nextNode;
        return;
      } else {
        if (index > this.size() - 1 || index < 0) {
          return "Out of Range";
        }

        let temp = this.first.nextNode;
        let prev = this.first;
        let i = 1;

        while (temp.nextNode != null) {
          if (i === index) {
            node = prev;
            break;
          }
          i++;

          prev = temp;
          temp = temp.nextNode;
        }

        if (i === this.size() - 1) {
          node = prev;
        }
      }

      let secondNode = node.nextNode;
      node.nextNode = secondNode.nextNode;
      secondNode.nextNode = null;
    }
  }
}

export default LinkedList;
