const data = [1,2,3,4];
const isMetOceanData = (data) =>({
    ok:function(){
        return true;
    }
})
const d = isMetOceanData(data).ok();
console.log(d)