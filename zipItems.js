function zipItems/*<T>*/(
    primaryItems/*: T[]*/,
    secondaryItemsFactory/*: (length: uint) => T[]*/,
    offset/*: uint, < primaryItems.length*/,
    period/*: uint, >= 2*/,
)/*: T[]*/ {
    const firstPart = primaryItems.slice(0, offset);
    const offsetPart = primaryItems.slice(offset);
    // advanced variant solution
    const secondArray = secondaryItemsFactory(Math.ceil(offsetPart.length / (period - 1)));
    period--;
    const modifiedOffsetPart = offsetPart
        .reduce(function (res, current, index) {
            return index % period === 0 ?
                res.concat([secondArray[Math.trunc(index / period)], current]) :
                res.concat([current])
        }, []);
    return firstPart.concat(modifiedOffsetPart);
}


const createSecondaryItemsFactory = () => {
    const iterator = secondaryItemsGenerator()
    return (count) => {
        const items = []
        while (count--) {
            items.push(iterator.next().value)
        }
        return items
    }
}

function itemsFactory(length) {
    return Array.from({length}).fill(0).map((_, i) => 1000 + i)
}

function* secondaryItemsGenerator() {
    let index = 0
    while (true) {
        yield index++
    }
}

function runTest(testIndex, primaryItemsLength, offset, period, expectedResult) {
    let secondaryItemsFactory = createSecondaryItemsFactory()
    let secondaryItemsFactoryCalls = []
    const result = zipItems(
        itemsFactory(primaryItemsLength),
        (count) => {
            secondaryItemsFactoryCalls.push(count)
            return secondaryItemsFactory(count)
        },
        offset,
        period,
    )

    const resultMatchesExpectations = (
        result &&
        result.length === expectedResult.length &&
        result.every((item, index) => item === expectedResult[index])
    )
    const passed = secondaryItemsFactoryCalls.length && resultMatchesExpectations

    const report = document.createElement('p')
    report.classList.add(passed ? 'pass' : 'error')
    report.append(`Test #${testIndex} ${passed ? 'passed' : 'failed'}`)
    if (!secondaryItemsFactoryCalls.length) {
        const secondaryItemsFactoryText = document.createElement('code')
        secondaryItemsFactoryText.append('secondaryItemsFactory')
        report.append(
            document.createElement('br'),
            'The ',
            secondaryItemsFactoryText,
            ' function was not called',
        )
    }
    if (!resultMatchesExpectations) {
        const values = document.createElement('code')
        values.append(
            `Expected: ${JSON.stringify(expectedResult)}`,
            document.createElement('br'),
            `Received: ${JSON.stringify(result)}`,
        )
        report.append(
            document.createElement('br'),
            values,
        )
    }

    document.body.append(report)
}

runTest(1, 10, 7, 2, [1000,1001,1002,1003,1004,1005,1006,0,1007,1,1008,2,1009])
runTest(2, 23, 2, 3, [1000,1001,0,1002,1003,1,1004,1005,2,1006,1007,3,1008,1009,4,1010,1011,5,1012,1013,6,1014,1015,7,1016,1017,8,1018,1019,9,1020,1021,10,1022])
runTest(3, 5, 4, 6, [1000,1001,1002,1003,0,1004])
runTest(4, 5, 0, 3, [0,1000,1001,1,1002,1003,2,1004])
runTest(5, 5, 1, 3, [1000,0,1001,1002,1,1003,1004])
runTest(6, 50, 3, 7, [1000,1001,1002,0,1003,1004,1005,1006,1007,1008,1,1009,1010,1011,1012,1013,1014,2,1015,1016,1017,1018,1019,1020,3,1021,1022,1023,1024,1025,1026,4,1027,1028,1029,1030,1031,1032,5,1033,1034,1035,1036,1037,1038,6,1039,1040,1041,1042,1043,1044,7,1045,1046,1047,1048,1049])
