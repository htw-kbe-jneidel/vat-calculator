import * as rabbitMq from "./entity/rabbit-mq";

( async () => {
  const rabbitMqConnection = new rabbitMq.Connection( "127.0.0.1" );
  await rabbitMqConnection.open();
  const queue = new rabbitMq.Queue( rabbitMqConnection );
  await queue.create();
  const o = { price: 1.99, category: "küchenzubehör" };
  const r = await queue.send( "calculateVat", o );
  console.log( r );
  process.exit( 0 );
} )();
