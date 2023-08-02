const obj = {};

const handler = {
    get(tartget, key) {
        console.log(`getting ${key}`);
        return tartget[key];
    },
    set(tartget, key, value) {
        console.log(`setting ${key} to ${value}`);
        tartget[key] = value;
    },
};

const proxy = new Proxy(obj, handler);

proxy.message = "hello";

proxy.message = "hi";

console.log(proxy.message);
