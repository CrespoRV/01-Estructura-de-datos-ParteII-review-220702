function LinkedList() {
    this.tail = null;
    this.head = null;
  }
  
  function Node (value, next, prev) {
    this.value = value;
    this.next = next || null;
    this.previous = prev || null;
  }
  
  LinkedList.prototype.addToTail = function(value) {
    const newTail = new Node(value, null, this.tail);
    if (this.tail) {
      this.tail.next = newTail;
    } else {
      this.head = newTail;
    }
    this.tail = newTail;
  };
  
  LinkedList.prototype.addToHead = function(value) {
    const newHead = new Node(value, this.head, null);
    if(this.head) {
      this.head.previous = newHead;
    } else {
      this.tail = newHead;
    }
    this.head = newHead;
  
  };
  
  LinkedList.prototype.removeHead = function() {
    if (!this.head) return;
    const oldValue = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.previous = null;
    } else  {
      this.tail = null;
    }
    return oldValue;
  };
  
  LinkedList.prototype.removeTail = function() {
    if (!this.tail) return;
    const oldValue = this.tail.value;
    this.tail = this.tail.previous;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    return oldValue;
  };
  
  function isFn (fn) {
    return typeof fn === 'function';
  }
  
  LinkedList.prototype.search = function(predicate) {
    const correct = isFn(predicate) ? predicate : function(value) {
    return value === predicate;
   }
    let currentNode = this.head;
    while (currentNode) {
      if (correct(currentNode.value)) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  };