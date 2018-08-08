function vetamgiac(key, rong) {
    let num = 0;
    let res = "";
    for (let i = 0; i < rong * 2 - 1; i++) {
        if (i < rong)
            num++;
        else if (i >= rong)
            num--;
        for (let j = 0; j < num; j++) {
            res += key;
        }
        res += "\n";
    }
    return res;
}
exports.vetamgiac = vetamgiac;