const { Chance } = require('chance')
const { Kafka } = require('kafkajs')
const { Partitioners } = require('kafkajs')
const message=require('./input.json')


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9093']
})
var chance = new Chance();


for (var i in message){
    console.log("msg",message[i])
}
// kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })

// const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
// const producer=kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
// const consumer = kafka.consumer({ groupId: 'test-group' })
const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner }) 
const producermsg=async()=>{
    await producer.connect()
    for (var i in message){
        console.log("msg",message[i])
    
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: JSON.stringify(message[i])},
      ],
      
    })
}
}

const run=async()=>{
    producermsg()
}
run()





// const produceMessage = async () => {
 
    
//     try {
//       await producer.send({
//         topic: 'test-topic',
//         messages: [
//           { value: 'Hello KafkaJS user!' },
//         ],
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// const run = async () => {
//   // Producing
//   await producer.connect()
//   setInterval(produceMessage, 1000)
  
// }
// run().catch(console.error) 
