//SOLUCION CON LINKED LIST (LL)
/*
function Queue() {
    this.ll = new LinkedList();
    this.length = 0;
}
Queue.prototype.enqueue = function(value) {
    this.ll.addToTail(value);
    this.length += 1;
};
Queue.prototype.dequeue = function() {
    if(this.length) this.length -= 1;
    return this.ll.removeHead();
};
Queue.prototype.size = function() {
    return this.length;
};
*/


/*
//SOLUCION CON ARRAY
function Queue(){
    this.head = 0;
    this.tail = 0;
    this.data = [];
}
Queue.prototype.enqueue = function(value){
   this.data[this.tail] = value;
   this.tail++;
}
Queue.prototype.dequeue = function(){
    const value = this.data[this.head]
    if (value) this.head++
    return value; 
} //we never remove the first element of this.data, only the head pointer

Queue.prototype.size = function(){
    return this.tail - this.head;
}
*/