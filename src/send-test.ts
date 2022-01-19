import * as rabbitMq from "./rabbit-mq";

( async () => {
  const rabbitMqConnection = new rabbitMq.Connection( "127.0.0.1" );
  await rabbitMqConnection.open();
  const queue = new rabbitMq.Queue( rabbitMqConnection );
  await queue.create();
  const o = { price: 187, category: "küchenzubehör" };
  const r = await queue.send( "vat-calculator", o );
  console.log( r );
  process.exit( 0 );
} )();
