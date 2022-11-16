function generateThousand(number) {
    if (!number)
        return 0
    else
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default generateThousand;