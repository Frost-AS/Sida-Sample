// to Set an Item
function setStorageItem(key,value){
    localStorage.setItem(key,value);
    console.log(key + " with value of " + value + " has been set to local storage");
}

// to get an Item
function getStorageItem(key){
    const fetchedValue = localStorage.getItem(key);
    if (fetchedValue !== null){
        return fetchedValue
    }
    else{
        console.warn("No value found with key of " + key + " !");
    }
}

// to remove an Item
function removeStorageItem(key) {
    const fetchedValue = localStorage.getItem(key);

    if (fetchedValue !== null) {
        localStorage.removeItem(key);
        console.log(key + " has been removed from local storage with value of " + fetchedValue);
    } else {
        console.log(key + " does not exist in local storage");
    }
}

// to get the key name of an index
function keyStorageItem(index){
    return (localStorage.key(index));
}

// to get lengh of all keys have been set
function lengthStorage(){
    return (localStorage.length);
}

// to table all the storage keys and valus
function tableStorage() {
    const storageData = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        storageData.push({
            key: key,
            value: value
        });
    }

    console.table(storageData);
}

// to Remove all storage keys
function clearStorage(){
    let confirmModal = document.getElementById("confirmModal");
    let confirmModalbts = new bootstrap.Modal(confirmModal);
    confirmModalbts.show();
    let yesconfirmbtn = document.getElementById("yesconfirmbtn").addEventListener("click",()=>{
    localStorage.clear();
    console.log("[SUCCESS]: Local Storage has been cleared!")
    PrintToast2("عملیات با موفقیت انجام شد",2000);
    });
}