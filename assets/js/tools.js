export const delegate = (target, callback) => {
    return function (e) {
        if (e.target.matches(target)) {
            callback(e);
        }
    };
};

export const get = async (url, callback) => {
    try {
        const response = await fetch(url);
        const obj = await response.json();
        callback(obj);
    } catch(error) {
        callback(false);
    }
}