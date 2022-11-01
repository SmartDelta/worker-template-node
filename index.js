const io = require('socket.io-client');

/**
 * Base class representing a worker in the Mobile Mapping System environment
 * 
 * A worker represents a software implementation of sensors implemented using software and/or hardware.
 */
class Worker {
    config = null; // The config used for our worker.
    client = null; // The socket io client

    constructor(config) {
        this.config = config;
        this.client = io.connect(this.config.hub_address);

        this.client.on('worker_receive_setting', setting => console.log(setting));
        this.client.on()
        this.client.on('disconnect', () => {
          this.register();
        });

        this.register();
    }

    /**
     * Registers the current worker.
     */
    register() {
        this.client.emit('register', this.config, (...args) => {
            console.log(args);
        });
    }

    /**
     * Sends a preview to the HUB.
     *
     * @param {[unknown]} packet Packet can contain anything. 
     * With JPEGs this would be binary data.
     */
    sendPreview(packet) {        
        this.client.emit('worker_push_preview', packet);
    }

    /**
     * 
     * @param {[Telemetry]} packet
     */
    sendTelemetry(packet) {
        this.client.emit('worker_push_telemetry', packet);
    }

    /**
     * @return  {[type]}  [return description]
     */
    on(event, callback) {
        return this.client.on(event, callback());
    }
}

module.exports = Worker
