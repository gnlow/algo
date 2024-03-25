const binSearch =
(judge: (actual: number) => number) =>
(monoIncr: MonoIncr) =>
(begin: number, end: number): number => {
    const center = Math.floor((begin + end) / 2)
    const centerY = monoIncr.f(center)
    const result = judge(centerY)

    if (result < 0) return binSearch(judge)(monoIncr)(begin, center-1)
    if (result == 0) return centerY
    if (result > 0) return binSearch(judge)(monoIncr)(center+1, end)

    throw 0
}

class MonoIncr {
    f
    domain
    constructor(
        f: (x: number) => number,
        domain: [number, number],
    ) {
        this.f = f
        this.domain = domain
    }
    lowerBound(targetY: number) {
        return binSearch
            (y => targetY - y)
            (this)
            (...this.domain)
    }
    static fromArray(arr: number[]) {
        arr.sort()
        return new MonoIncr(x => arr[x], [0, arr.length - 1])
    }
}

console.log(
    MonoIncr.fromArray([1, 3, 2])
        .lowerBound(2.5)
)