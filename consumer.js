const { ConversationProfilesClient } = require('@google-cloud/dialogflow')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092', 'localhost:9093']
  })
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {

await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const passengerinfo=message.value.toString()
      const finalpassengerinfo=checkcriteria(passengerinfo)
            
      if(finalpassengerinfo){  
      const finalvalue=retreivevalue(passengerinfo)   
      console.log(finalvalue[0])
      console.log(finalvalue[1])
      console.log("finalvalue",finalvalue)
      console.log("Alert!!!!!!"    
        , message.value.toString()     
      )
      
      }
             
    },
  })

  function checkcriteria(passengerinfo){
    const alertpassengerinfo= JSON.parse(passengerinfo);
    if(alertpassengerinfo.bodyTemperature>37){
            return alertpassengerinfo
          }
  }

  function retreivevalue(passengerinfo){
    console.log("inside")
    const retreivepassengerinfo= JSON.parse(passengerinfo);
    let firstname=retreivepassengerinfo.firstName
    let age=retreivepassengerinfo.age
    return [firstname,age]

  }
}

run().catch(console.error)