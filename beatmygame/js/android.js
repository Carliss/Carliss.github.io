var btnConnect = document.querySelector('#connect');
var bpm = document.querySelector('#bpm');

btnConnect.addEventListener('click', connectToPolar);

function connectToPolar () {
    device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] });
    device = await device.gatt.connect();
    hr = await device.getPrimaryService('heart_rate');
    ch = await hr.getCharacteristic('heart_rate_measurement');
    ch = await ch.startNotifications();
    ch.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
}

function handleCharacteristicValueChanged(event) {
      value = event.target.value;
      bpm.innerHTML = 'Received ' + value.getInt16();
    }