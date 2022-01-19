#!/usr/bin/env node

import amqp from "amqplib";
import EventEmitter from "events";

import { Connection } from ".";

export class Queue {
  connection: Connection;
  private _channel: any = undefined;
  private _replyFunction: Function|undefined = undefined;

  constructor( conn: Connection ) {
    this.connection = conn;
  }

  async create() {
    this._channel = await this.connection.createChannel();
  }
  get channel() {
    if ( this._channel === undefined )
      throw new Error( "Queue.create has not been called" );

    return this._channel;
  }

  setReplyFunction( func: Function ) {
    this._replyFunction = func;
  }
  get replyFunction() {
    if ( this._replyFunction === undefined )
      throw new Error( "Queue.setReplyFunction has not been called" );

    return this._replyFunction;
  }

  private sendReply( msg: any, result: String ) {
    const { channel } = this;

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from( result ),
      { correlationId: msg.properties.correlationId }
    );
    channel.ack( msg );
  }

  listen( queueName: String ) {
    const { channel } = this;

    channel.assertQueue( queueName, {
      durable: false,
    } );
    channel.prefetch( 1 );
    console.log( `Listening to rabbitmq Queue: ${queueName}` );
    channel.consume( queueName, ( msg: any ) => {
      const json = JSON.parse( msg.content.toString( "utf8" ) ); // missing error handling
      const reply = this.replyFunction( json );
      this.sendReply( msg, JSON.stringify( reply ) );
    } );
  }

  async send( destinationQueueName: String, data: any ) {
    const eventEmitter = new EventEmitter();
    const correlationId = Math.random().toString() + Math.random().toString() + Math.random().toString();
    const { channel } = this;

    const q = await channel.assertQueue( "", { exclusive: true } );

    channel.consume( q.queue, ( msg: any ) => {
      if ( msg.properties.correlationId === correlationId ) {
        const json = JSON.parse( msg.content.toString( "utf8" ) ); // missing error handling
        eventEmitter.emit( "consumeDone", json );
      }
    }, {
      noAck: true,
    } );

    channel.sendToQueue(
      destinationQueueName,
      Buffer.from( JSON.stringify( data ) ),
      {
        correlationId,
        replyTo: q.queue,
      }
    );

    return await new Promise( resolve => eventEmitter.once( "consumeDone", resolve ) );
  }
}