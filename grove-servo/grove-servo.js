var path = require('path');

module.exports = function(RED) {
    function GroveServo(config) {

        RED.nodes.createNode(this,config);

        this.port_number = config.port_number;

        if(this.port_number == 12){
            this.port_name = "PWM";
        } else {
            this.port_name = "D" + this.port_number;
        }
        
        this.status({fill:"blue",shape:"dot",text:this.port_name});
        
        var node = this;
        node.on('input', function(msg) {
            // msg.payload = msg.payload.toLowerCase();
            const gpio_pin = this.port_number;
            const exec = require('child_process').exec;
            this.status({fill:"yellow",shape:"ring",text:this.port_name + " connecting"});
            exec('python -u ' + path.join( __dirname , 'grove-servo.py') + ' ' + gpio_pin + ' ' + msg.payload, (err, stdout, stderr) => {
                if (err) { console.log(err); }
                // console.log(stdout);
                this.status({fill:"green",shape:"dot",text:this.port_name + " connected"});
            });
            
            // node.send(msg);
        });
    }
    RED.nodes.registerType("grove-servo",GroveServo);
}
