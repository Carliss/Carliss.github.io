var btnConnect = document.querySelector('#connect');
var bpm = document.querySelector('#bpm');

btnConnect.addEventListener('click', connectToPolar);
btnConnect.addEventListener('touchstart', connectToPolar);

async function connectToPolar () {
    // filters: [{ services: ['heart_rate'] }]
    console.log('click connect')
    var device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
    device = await device.gatt.connect();
    var hr = await device.getPrimaryService('heart_rate');
    var ch = await hr.getCharacteristic('heart_rate_measurement');
    ch = await ch.startNotifications();
    ch.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
}

function handleCharacteristicValueChanged (event) {
    value = event.target.value;
    bpm.innerHTML = 'Received ' + value.getInt16();
}