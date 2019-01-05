const BASE_URL = location.pathname;

const HttpService = {
    sendRequest(url, { method = 'GET', successCallback }) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + url, true);
        xhr.send();

        xhr.onload = () => {
            let responseData = JSON.parse(xhr.responseText);
            successCallback(responseData);
        };

        xhr.onerror = () => {
            console.error(xhr.status + ': ' + xhr.statusText);
        }
    },
};

export default HttpService;