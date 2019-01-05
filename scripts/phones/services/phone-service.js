import HttpService from '../../shared/services/http-service.js'

const PhoneService = {
    getPhones() {
        return HttpService.sendRequest('phones/phones.json');
    },

    getPhone(phoneId) {
        return HttpService.sendRequest(`phones/${phoneId}.json`);
    },
};

// handmade promise class MyPromise
class MyPromise {
    constructor(behaviorFunction) {
        this._successCallbacks = [];
        this._errorCallbacks = [];
        this._status = 'pending';
        this._result = null;

        behaviorFunction(this._resolve.bind(this), this._reject.bind(this));
    };

    then(successCallback, errorCallback) {
        if (this._status === 'fullfilled') {
            successCallback(this._result);
        } else if (this._status === 'rejected') {
            errorCallback(this._result);
        } else {
            this._successCallbacks.push(successCallback);
            if (errorCallback) {
                this._errorCallbacks.push(errorCallback);
            }
        }
    };

    catch(errorCallback) {
        if (this.status === 'rejected') {
            errorCallback(this._result);
        } else {
            this._errorCallbacks.push(errorCallback);
        }
    }

    _resolve(data) {
        this._status = 'fullfilled';
        this._result = data;
        this._successCallbacks.forEach(callback => callback(data));
    };

    _reject(error) {
        this._status = 'rejected';
        this._result = error;
        this._errorCallbacks.forEach(callback => callback(error));
    }
}

export default PhoneService;