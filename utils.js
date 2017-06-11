import math from 'mathjs';

function smooth (values, t) {
    const end = values.length;
    const begin = Math.max(end - t, 0);
    if (begin === end) {
        return 0;
    }
    const size = end - size;
    return math.sum(values.slice(begin, end)) / size;

}

export const smooth;