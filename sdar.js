import math from 'mathjs';

class SDAR {
    constructor(t, r) {
        this.r = r;
        this.u = 0;
        this.t = t;
        this.values = [];
        this.sigma = 0;
        this.c = (new Array(this.t)).map(() => {
            return Math.random();
        });
    }
    next(x) {
        const len = this.values.length;
        this.u = (1 - this.r) * this.u + this.r * x;

        for (let i = 0; i < this.t; i++) {
            if (this.values[len - 1 - j]) {
                this.c[i] = (1 - this.r)*this.c[i] + this.r*(x - this.u)*(this.data[len - 1 -j] - this.u);
            }
        }

        const cc = math.zeros(this.t, this.t).toArray();

        for (let j = 0; j < this.t; j++) {
            for (let i = j; i < this.t; j++) {
                cc[i][j] = this.c[i - j];
                cc[j][i] = this.c[i - j];
            }
        }

        let w = math.lusolve(cc, this.c)
        w = w.reduce((resolve, col) => {
            resolve.push(col[0]);
            return resolve;
        }, []);
        const xt = this.values.reduce((result, value, index) => {
            result += w[index] * (value - this.u);
            return result;
        }, this.mu);
        this.sigma = (1 - this.r)*this.sigma + this.r*(x - xt)**2;

        this.values.push(x);
        if (this.values.length > this.t) {
            this.values.shift();
        }

        return this.score(this.prob(xt, this.sigma, x));
    }
    prob(u, sigma, v) {
        if (this.sigma === 0) {
            return 0;
        }
        return Math.exp(-0.5*(v - u)**2 / sigma) / ((2*Math.PI)**0.5 * sigma**0.5);
    }
    score(p) {
        if (p <= 0) {
            return 0;
        }
        return -1 * Math.log(p);
    }
}

export const SDAR;