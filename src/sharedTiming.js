import raf, { cancel as caf } from 'raf';

class SharedTiming {
	constructor() {
		this.running = {
			count: 0,
			limit: 0,
		};
		this.stamps = {
			start: null,
			raf: null,
		};
		this.rafIdRegistry = {};
	}
	makeStamp(stamp, reset) {
		if (!this.stamps[stamp] || reset) {
			this.stamps[stamp] = Date.now();
		}
		return this.stamps[stamp];
	}
	raf(cb) {
		if (!this.running.count) {
			this.running.count = 1;
		} else {
			this.running.count++;
		}
		const rafId = raf(() => {
			delete this.rafIdRegistry[rafId];
			this.stamps.start = null;
			if (!this.running.limit) {
				this.running.limit = this.running.count;
				this.makeStamp('raf', true);
				this.running.count = 0;
			}
			this.running.limit--;
			cb();
		});
		this.rafIdRegistry[rafId] = true;
		return rafId;
	}
	caf(rafId) {
		if (rafId && this.rafIdRegistry[rafId]) {
			caf(rafId);
			this.stamps.start = null;
			this.running.count--;
			delete this.rafIdRegistry[rafId];
		}
	}
}
const sharedTiming = new SharedTiming();

export { sharedTiming };
export default sharedTiming;
