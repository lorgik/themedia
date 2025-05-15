enum Values {
    FISRT,
    SECOND,
    THIRD,
}

function fn(value: Values) {
    switch (value) {
        case Values.FISRT:
            return value
        case Values.SECOND:
            return value
        default:
            const exhaustiveCheck: never = value
            return value
    }
}
