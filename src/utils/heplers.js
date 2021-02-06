let getPassedTime = played_at => {
    let p = new Date() - new Date(played_at);
    if (p / 1000 < 60) {
        return Math.floor(p / 1000) + ` secondes ago`;
    }
    else if (p / 60000 < 60) {
        let s = Math.floor(p / 60000) === 1 ? '' : 's';
        return Math.floor(p / 60000) + ` minute${s} ago`;
    }
    else if (p / (60000 * 60) < 24) {
        let h = Math.floor(p / (60000 * 60)) === 1 ? '' : 's';
        return Math.floor(p / (60000 * 60)) + ` hour${h} ago`;
    }
    else if (p / (60000 * 60) < 48) {
        return 'One day ago'
    }
    else return new Date(played_at).toDateString()
}
let getDur = (t) => {
    t = Math.floor(t / 1000);
    return t.toString().length === 1 ? '0' + t : t;
}
let getDisplay = (i, f) => {
    return i > 4 ? { display: f } : null;
}
let getFormatedFollowers = (f) => {
    f = f.toString()
    let j = 0, r = '';
    for (let i = f.length - 1; i >= 0; i--) {
        r += (j % 3 === 0 && j !== 0) ? ',' : '';
        r += f[i];
        j++;
    }
    return Array.from(r).reverse();
}
let getPlaylistFormattedDur = (dur, formatted) => {
    let h = Math.floor(dur / 3600000),
        m = Math.floor((dur % 3600000) / 60000),
        s = Math.floor((((dur % 3600000) % 60000) / 1000));
    return formatted ?
        dur === 0 ?
            '00:00:00'
            :
            `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`

        : h + ' hr ' + m + ' min';
}
let getFoll = (n) => {
    n = n.toString()
    let len = n.length;
    return    len === 4 ? n[0] + '.' + n.slice(1, 3) + 'K'
            : len === 5 ? n.slice(0, 2) + '.' + n[2] + 'K'
            : len === 6 ? n.slice(0,3) + 'K'
            : len === 7 ? n[0] + '.' + n.slice(1, 3) + 'M'
            : len === 8 ? n.slice(0, 2) + '.' + n[2] + 'M'
            : len === 9 ? n.slice(0,3) + 'M'
            : n
}

let loadingOver = () => {
    let start = false;
    setInterval(()=> {
        start = true
    }, 2000)
    return start
}

export default getPassedTime;
export { getDur, getDisplay, getFormatedFollowers, getPlaylistFormattedDur, getFoll, loadingOver }