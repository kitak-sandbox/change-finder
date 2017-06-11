import SDAR from 'sdar';
import { smooth } from 'utils';

class ChangeFinder {
    constructor(outlierT, outlierR, changePointT, changePointR, smoothT) {
        this.outlierAnalyzer =  new SDAR(outlierT, outlierR);
        this.changePointAnalyzer = new SDAR(changePointT, changePointR);
        this.smoothT = parseInt(smoothT, 10);
        this.buffer = [];
    }
    update(x) {
        const o = this.outlierAnalyzer.next(x);

        this.buffer.push(o);
        if (this.buffer.length > this.smoothT) {
            this.buffer.shift();
        }
        smoothedO = smooth(this.buffer, this.smoothT);

        this.changePointAnalyzer.next(smoothedO);
    }
    learn(values) {
        return values.reduce((result, val) => {
            result.push(this.update(val));
            return result;
        }, []);
    }
}
export const ChangeFinder;