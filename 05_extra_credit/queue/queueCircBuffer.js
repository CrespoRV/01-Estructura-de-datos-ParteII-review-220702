function QueueCirc(len){
    this.data = new Uint8Array(new ArrayBuffer(len))
}

QueueCirc.prototype.enqueue = function(value){
    if (!Number.isInteger(value) || (value<0 || value>255)) throw "invalid value"
    if (this.data.at(-1)) throw "full queue"
    const index = this.data.findIndex(elem => elem==0)
    this.data.set([...this.data.slice(0,index)],1)
    this.data[0] = value
    return value
}

QueueCirc.prototype.dequeue = function(){
    if (!this.data[0]) throw "empty queue"
    const index = this.data.findLastIndex(elem => elem!==0)
    const deletedValue = this.data[index]
    this.data[index]=0
    return deletedValue;
}