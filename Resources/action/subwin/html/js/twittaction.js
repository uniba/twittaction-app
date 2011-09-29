(function(exports) {
    exports.Twittaction = function(selector) {
        if (!(this instanceof Twittaction)) {
            return new Twittaction(selector);
        }
        this.element = document.getElementById(selector);
        this.queue = [];
        return this;
    };

    Twittaction.prototype.execute = function() {
        var self = this;
        loop(this.queue.length, function(i) {
            return self.queue[i].call(self.element);
        });
    };

    Twittaction.prototype.add = function(data, type, option) {
        var i, len;
        type = type || 'defaultCommand';
        option = option || {};
        if (data instanceof Array) {
            for (i = 0, len = data.length; i < len; i++) {
                this.queue.push(command[type].call(null, data[i], option));
            }
        } else {
            this.queue.push(command[type].call(null, data, option));
        }
        return this;
    };

    var command = {
        defaultCommand: function(data, option) {
            var x = Math.round(data.x * 10),
                y = Math.round(data.y * 10),
                z = Math.round(data.z * 10);
            return function() {
                var dfd = new Deferred();
                var flag = true;
                Move(this)
                    .translate(x, y)
                    .duration('0.0s')
                    /*.then()
                        .translate(-x, -y)
                        .duration('0.033s')*/
                        .then(function() { dfd.call(); })
                        .pop()
                    .end();
                return dfd;
            };
        },

        rotate: function(data, option) {

        }
    };

    Deferred.define();

})(this);