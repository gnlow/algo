const binSearch =
(judge: (actual: number) => "left" | "right" | number) =>
(monoIncr: MonoIncr) =>
(begin: number, end: number): number => {
    const center = Math.floor((begin + end) / 2)
    const centerY = monoIncr.f(center)
    const result = judge(centerY)

    if (begin == end) return centerY

    if (result == "left") return binSearch(judge)(monoIncr)(begin, center-1)
    if (result == "right") return binSearch(judge)(monoIncr)(center+1, end)
    return result
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
            (y => {
                if (targetY < y) return "left"
                if (targetY == y) return "right"
                if (targetY > y) return "right"
                throw 0
            })
            (this)
            (...this.domain)
    }
    upperBound(targetY: number) {
        return binSearch
            (y => {
                if (targetY < y) return "left"
                if (targetY == y) return "left"
                if (targetY > y) return "right"
                throw 0
            })
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
        .upperBound(2.5)
)