(function () {
    const filetypeDiv = document.getElementById('filetype');
    const fileContainerDiv = document.getElementById('file-container');

    const urlPatternRegx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    ;

    const URL_List = [
        {url: "https://www.google.com", type: "file"},
        {url: "https://www.wikipedia.org", type: "folder"},
        {url: "https://www.openai.com", type: "file"},
        {url: "https://www.github.com", type: "folder"},
        {url: "https://www.stackoverflow.com", type: "file"}
    ];

//debounce to avoid throttle
    let timeout;
    const debounce = function (func, delay = 300) {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };

//get value from input & check
    document.getElementById("urlInput").addEventListener("input", function (e) {
        filetypeDiv.innerHTML = '';
        fileContainerDiv.classList.remove('hidden');

        const url = e.target.value.trim();
        const isValid = isValidURL(url);
        this.classList.add(isValid ? 'border-green-500' : 'border-red-300');
        this.classList.remove(!isValid ? 'border-green-500' : 'border-red-300');

        if (isValid) {
            filetypeDiv.innerHTML = 'Requesting....';
            debounce(() => checkUrlType(url), 300);
        } else {
            fileContainerDiv.classList.add('hidden');
        }

    });

    const checkUrlType = async (url) => {
        await ApiCall(url).then((type) => {
            if (type) {
                filetypeDiv.innerHTML = '';
                filetypeDiv.append(type);
            } else {
                filetypeDiv.innerHTML = 'No file associated with this Url';
            }
        });
    }

//url validation
    const isValidURL = string => {
        const result = string.match(urlPatternRegx);
        return (result !== null);
    }

//mock API call Async
    const ApiCall = async (str) => {
        const res = await new Promise(resolve => setTimeout(() => {
            //file ths url & return the object
            const urlObject = URL_List.find(obj => obj.url == str);
            const urlType = urlObject ? urlObject.type : null;
            resolve(urlType);
        }, 0));

        return res;
    }

})();
