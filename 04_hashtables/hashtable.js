function HashTable() {
    this.buckets = [];
    this.numBuckets = 35;
}
  
  HashTable.prototype.set = function(key, value) {
    if (typeof key !== 'string') throw new TypeError('Keys must be strings');
    const hashedKey = this.hash(key);
    this.buckets[hashedKey] = this.buckets[hashedKey] || new LinkedList();
    this.buckets[hashedKey].addToHead({ key, value });
  };
  
  HashTable.prototype.get = function(key) {
    const hashedKey = this.hash(key);
    const found = this.buckets[hashedKey].search(function(obj) {
      return key === obj.key;
    });
    return found && found.value;
  };
  
  HashTable.prototype.hasKey = function(key) {
    if (this.get(key)) return true
    return false
  };
  
  HashTable.prototype.hash = function(value) {
    let total = 0;
    for (let i = 0; i < value.length; i++) {
      total += value[i].charCodeAt();
    }
    return total % this.numBuckets;
  };