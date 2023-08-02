const obj = {};

let value = '';

Object.defineProperty(obj,"prop",{
    set(newValue){
        console.log("setting prop...");
        value=newValue;
    },
    get(){
        console.log("getting prop...");
        return value;
    }
})

obj.prop="test";

console.log(obj.prop);