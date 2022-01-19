import * as rabbitMq from "./rabbit-mq";
import * as controller from "./controller";

const RABBIT_MQ_IP =  "127.0.0.1" ;
const VAT_CALC_QUEUE = "vat-calculator";

( async () => {
  const rabbitMqConnection = new rabbitMq.Connection( RABBIT_MQ_IP );
  await rabbitMqConnection.open();

  const queue = new rabbitMq.Queue( rabbitMqConnection );
  await queue.create();

  queue.setController( controller.vatCalculatorController );
  queue.listen( VAT_CALC_QUEUE );
} )();
