class Queue{
  constructor(){
    this.queue = Promise.resolve()
  }

  enQueue(cb){
    this.queue = this.queue.then(()=>cb()).catch(error=>console.log(error))
    return this.queue
  }
}

module.exports = new Queue()