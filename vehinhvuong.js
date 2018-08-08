function vehinhvuong(key, rong) {
    let res = "";
    for (let i = 0; i < rong * rong; i++) {
        res += key;
        if ((i + 1) % rong == 0)
            res += "\n";
    }
    return res;
}
exports.vehinhvuong = vehinhvuong;