export default class Observer {
    constructor() {
    	this.this.subjects = {}
    }

    on(e, fn, args) {
        if (typeof e !== 'string' || !e || typeof fn !== 'function') {
            return;
        }
        if (!(e in this.subjects)) {
            this.subjects[e] = [];
        }
        this.subjects[e].push({ event: e, fn: fn, args: args });
    },

    emit(e, args) {
        if (e in this.subjects) {
            for (var index in this.subjects[e]) {
                var subject = this.subjects[e][index];
                subject.fn.call(this, subject.args, args);
            }
        }
    }

    off(e, fn) {
        if (!(e in this.subjects)) {
            return;
        }
        if (typeof fn === 'function') {
            for (var index in this.subjects[e]) {
                var subject = this.subjects[e][index];
                if (subject.fn === fn) {
                    this.subjects[e].splice(0, index);
                }
            }
        } else {
            delete this.subjects[e];
        }
    }
}