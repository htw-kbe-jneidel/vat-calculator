import * as rabbitMq from "./rabbit-mq";
import { VatCalculator } from "./VatCalculator";
import { validateCaculateVatQueue } from "./validators";

const RABBIT_MQ_IP =  "127.0.0.1" ;
const VAT_CALC_QUEUE = "vat-calculator";

const vatCalculator = new VatCalculator();
const replyFunction = data => {
  const response = validateCaculateVatQueue( data );
  if ( response != null )
    return response

  return {
    vat: vatCalculator.calc( data.price, data.category ),
    error: false,
  };
};

( async () => {
  const rabbitMqConnection = new rabbitMq.Connection( RABBIT_MQ_IP );
  await rabbitMqConnection.open();
  const queue = new rabbitMq.Queue( rabbitMqConnection );
  await queue.create();
  queue.setReplyFunction( replyFunction );
  queue.listen( "vat-calculator" );
} )();
