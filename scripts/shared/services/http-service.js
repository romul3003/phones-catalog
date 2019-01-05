const BASE_URL = location.pathname;

const HttpService = {
    sendRequest(url, { method = 'GET', successCallback, errorCallback }) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + url, true);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status !== 200) {
                errorCallback(xhr.status + ': ' + xhr.statusText);
                return;
            }

            let responseData = JSON.parse(xhr.responseText);
            successCallback(responseData);
        };

        // xhr.onerror = () => {
        //     let callback = errorCallback || console.error;
        //     callback(xhr.status + ': ' + xhr.statusText);
        // }
    },
};

export default HttpService;