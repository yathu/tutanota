const urlPatternRegx = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
const URL_List = [
    "https://www.google.com",
    "https://www.wikipedia.org",
    "https://www.openai.com",
    "https://www.github.com",
    "https://www.stackoverflow.com"
];

//default timeout 1s
const debounce = (func, wait = 1000) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

//get value from input & check
document.getElementById("urlInput").addEventListener("input", async function (e) {
    const url = e.target.value.trim();
    const isValid = isValidURL(url);
    this.classList.add(isValid ? 'border-green-500' : 'border-red-300');
    this.classList.remove(!isValid ? 'border-green-500' : 'border-red-300');

    if (isValid) {
       debounceCheck(url);
    }

});

//url validation
const isValidURL = string => {
    const result = string.match(urlPatternRegx);
    return (result !== null);
}

//mock check is exists using debounce to avoid multiple request
const debounceCheck = debounce(async function (str) {
    const res = await new Promise(resolve => setTimeout(() => {
        resolve(URL_List.includes(str))
    }, 100));


    if(res) {
        //show error message
        document.getElementById('urlError').classList.add('block');
        document.getElementById('urlError').classList.remove('hidden');
    }else {
        //can Save Data
        document.getElementById('urlError').classList.remove('block');
        document.getElementById('urlError').classList.add('hidden');
    }

}, 500);
