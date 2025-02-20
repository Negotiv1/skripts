// ==UserScript==
// @name         гей
// @namespace    none
// @version      none
// @description  none
// @author       You
// @match        none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastTime = 0;
    let fps = 0;
    let frameCount = 0;

    function updateFPS() {
        let now = performance.now();
        frameCount++;

        if (now - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = now;
        }

        requestAnimationFrame(updateFPS);
    }

    updateFPS();

    const creditsDisplay = document.createElement('div');
    creditsDisplay.style.position = 'absolute';
    creditsDisplay.style.bottom = '10px';
    creditsDisplay.style.left = '10px';
    creditsDisplay.style.fontSize = '14px';
    creditsDisplay.style.color = 'white';
    creditsDisplay.style.textAlign = 'center';
    creditsDisplay.style.zIndex = '9999';
    creditsDisplay.style.background = 'linear-gradient(45deg, #ff00ff, #00ffff)';
    creditsDisplay.style.padding = '5px';
    creditsDisplay.style.borderRadius = '5px';

    document.body.appendChild(creditsDisplay);

    creditsDisplay.innerHTML = 'By Mr.Negotiv|By Ananas|By Akuma|By Weest_bek|Обновление 1.0 ✅| <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9o-JtygFCSL-JewJsw-UHusojkEjxiaVci-UBn1aUp1Tzxw49w99qifuwQuem7FzqomTzDq9uLP5-/pubhtml#" target="_blank" style="color: white; text-decoration: underline;">СОЗДАТЕЛИ</a>';

    const fpsDisplay = document.createElement('div');
    fpsDisplay.style.position = 'absolute';
    fpsDisplay.style.top = '10px';
    fpsDisplay.style.left = '10px';
    fpsDisplay.style.fontSize = '14px';
    fpsDisplay.style.color = 'white';
    fpsDisplay.style.textAlign = 'center';
    fpsDisplay.style.zIndex = '9999';
    fpsDisplay.style.background = 'linear-gradient(45deg, #00ff00, #0000ff)';
    fpsDisplay.style.padding = '5px';
    fpsDisplay.style.borderRadius = '5px';

    document.body.appendChild(fpsDisplay);

    function updateDisplay() {
        fpsDisplay.textContent = 'FPS: ' + fps;
        requestAnimationFrame(updateDisplay);
    }

    updateDisplay();
})();

(function () {
    'use strict';

    // ==================== ОБЩИЕ ПЕРЕМЕННЫЕ ====================
    let autoGHEnabled = false;
    let autoLeaveEnabled = false;
    // autoEKey – триггер для авто E; по умолчанию: пробел (" ")
    window.autoEKey = " ";

    // Переключатель для High Speed Auto E (изменяет интервал авто E)
    let autoESpeedEnabled = false;
    const NORMAL_INTERVAL = 10; // нормальная скорость: интервал 100 мс
    const FAST_INTERVAL = 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;      // высокая скорость: интервал 1 мс

    // ==================== МЕНЮ ====================
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '50%';
    menu.style.left = '50%';
    menu.style.transform = 'translate(-50%, -50%) scale(0)';
    menu.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    menu.style.opacity = '0';
    menu.style.background = 'rgba(0, 0, 0, 0.8)';
    menu.style.color = 'white';
    menu.style.padding = '20px';
    menu.style.borderRadius = '10px';
    menu.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    menu.style.zIndex = '9999';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.textAlign = 'center';
    menu.style.width = '300px';
    menu.innerHTML = `
        <span style="margin-right: auto; color: white; font-size: 12px;">By Akuma|By Mr.Negotiv|By Ananas|By weest_bek|1.0</span>
        <h2 style="margin: 0; font-size: 18px; font-weight: bold;">Mode</h2>
        <div style="margin-top: 15px;">
            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 14px;">
                <span>Auto GH (F)</span>
                <input type="checkbox" id="autoGHToggle" style="transform: scale(1.3);">
            </label>
            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 14px;">
                <span>Auto Leave (F2)</span>
                <input type="checkbox" id="autoLeaveToggle" style="transform: scale(1.3);">
            </label>
            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 14px;">
                <span>Auto E Trigger</span>
                <select id="autoEKeySelect" style="transform: scale(1);">
                    <option value=" " selected>Space</option>
                    <option value="MouseRight">Right Mouse Button</option>
                </select>
            </label>
            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 14px;">
                <span>High Speed Auto E</span>
                <input type="checkbox" id="autoESpeedToggle" style="transform: scale(1.3);">
            </label>
            <label style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 14px;">
                <span>Speed Hack E</span>
                <input type="checkbox" id="speedHackToggle" style="transform: scale(1.3);">
            </label>
        </div>
        <button id="closeMenu" style="
            margin-top: 10px;
            padding: 5px 15px;
            background: #444;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
        ">Close</button>
    `;
    document.body.appendChild(menu);

    const autoGHToggle = document.getElementById('autoGHToggle');
    const autoLeaveToggle = document.getElementById('autoLeaveToggle');
    const autoEKeySelect = document.getElementById('autoEKeySelect');
    const autoESpeedToggle = document.getElementById('autoESpeedToggle');
    const speedHackToggle = document.getElementById('speedHackToggle');
    const closeMenuButton = document.getElementById('closeMenu');

    autoGHToggle.addEventListener('change', () => {
        autoGHEnabled = autoGHToggle.checked;
    });
    autoLeaveToggle.addEventListener('change', () => {
        autoLeaveEnabled = autoLeaveToggle.checked;
    });
    autoEKeySelect.addEventListener('change', () => {
        window.autoEKey = autoEKeySelect.value;
    });
    autoESpeedToggle.addEventListener('change', () => {
        autoESpeedEnabled = autoESpeedToggle.checked;
        // Если авто E уже запущен – перезапускаем его с новым интервалом
        if (isRunning) {
            stopMrNegotivXProcessor();
            MrNegotivXProcessor();
        }
    });
    speedHackToggle.addEventListener('change', () => {
        if (speedHackToggle.checked) {
            enableSpeedHackListeners();
        } else {
            disableSpeedHackListeners();
            setGameSpeed(1);
        }
    });

    function openMenu() {
        menu.style.transform = 'translate(-50%, -50%) scale(1)';
        menu.style.opacity = '1';
    }
    function closeMenu() {
        menu.style.transform = 'translate(-50%, -50%) scale(0)';
        menu.style.opacity = '0';
    }
    closeMenuButton.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Insert') {
            if (menu.style.opacity === '0') {
                openMenu();
            } else {
                closeMenu();
            }
        }
    });

    // ==================== AUTO GH ====================
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    let cursorX = 0;
    let cursorY = 0;
    document.addEventListener("mousemove", (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;
    });
    function pressKey(key, code, keyCode) {
        const eventOptions = {
            key,
            code,
            keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true
        };
        window.dispatchEvent(new KeyboardEvent("keydown", eventOptions));
        window.dispatchEvent(new KeyboardEvent("keyup", eventOptions));
    }
    async function clickAtCursor() {
        const element = document.elementFromPoint(cursorX, cursorY);
        if (!element || element.closest(".menu, .ui, .disabled")) {
            console.warn("Элемент недоступен или заблокирован!");
            return;
        }
        const eventOptions = {
            bubbles: true,
            cancelable: true,
            button: 0,
            clientX: cursorX,
            clientY: cursorY
        };
        element.dispatchEvent(new MouseEvent("mousedown", eventOptions));
        await delay(54);
        element.dispatchEvent(new MouseEvent("mouseup", eventOptions));
    }
    document.addEventListener("keydown", async (event) => {
        if ((event.key === "f" || event.key === "F") && autoGHEnabled) {
            pressKey("0", "Digit0", 48);
            await delay(56);
            await clickAtCursor();
            pressKey("1", "Digit1", 49);
        }
    });

    // ==================== AUTO LEAVE ====================
    let autoLeaveActive = false;
    let autoLeaveInterval = null;
    // Переопределяем WebSocket для получения соединения
    const OriginalWebSocket = window.WebSocket;
    let wsInstance = null;
    window.WebSocket = class extends OriginalWebSocket {
        constructor(...args) {
            super(...args);
            wsInstance = this;
        }
    }
    function sendPacket(packet) {
        if (!wsInstance || wsInstance.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket connection is not open!');
            return;
        }
        try {
            const array = new Uint8Array(packet);
            wsInstance.send(array);
        } catch (e) {
            console.error('Error sending packet:', e);
        }
    }
    const packetGH = [23, 3, 3, 0, 38, 0, 0, 0];
    const autoLeavePacket = [255, 0, 0, 1];
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F2' && autoLeaveEnabled) {
            autoLeaveActive = !autoLeaveActive;
            if (autoLeaveActive) {
                autoLeaveInterval = setInterval(() => {
                    simulateKey('e');
                    sendPacket(packetGH);
                }, 50);
            } else {
                clearInterval(autoLeaveInterval);
                autoLeaveInterval = null;
            }
        }
    });
    function simulateKey(key) {
        const eventOptions = {
            key,
            code: 'Key' + key.toUpperCase(),
            keyCode: key.toUpperCase().charCodeAt(0),
            which: key.toUpperCase().charCodeAt(0),
            bubbles: true,
            cancelable: true
        };
        window.dispatchEvent(new KeyboardEvent("keydown", eventOptions));
        window.dispatchEvent(new KeyboardEvent("keyup", eventOptions));
    }
    function autoLeave() {
        if (!wsInstance || wsInstance.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket connection is not open!');
            return;
        }
        console.log('Авто лив активирован!');
        sendPacket(autoLeavePacket);
    }

    // ==================== AUTO E (MR.NEGOTIVX PROCESSOR) ====================
    let isRunning = false;
    let intervalId;
    function MrNegotivXProcessor() {
        if (isRunning) return;
        isRunning = true;
        const intervalDuration = autoESpeedEnabled ? FAST_INTERVAL : NORMAL_INTERVAL;
        intervalId = setInterval(() => {
            executeECommands();
            executeOtherCommands();
        }, intervalDuration);
    }
    function executeECommands() {
        triggerE();
    }
    function triggerE() {
        const eEvent = { key: 'e', code: 'KeyE', bubbles: true };
        for (let i = 0; i < 10; i++) {
            window.dispatchEvent(new KeyboardEvent('keydown', eEvent));
            window.dispatchEvent(new KeyboardEvent('keyup', eEvent));
        }
    }
    function executeOtherCommands() {
        Promise.all([
            fJ0(), pD3(), wB2(), vO8(), gH6(),
            jV4(), xD0(), bZ8(), sY7(), dP9(),
            uO2(), aJ4(), kV5(), commandQueueProcessing(),
            complexCalculations(), cacheProcessing([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            factorial(10), determinant([[1, 2], [3, 4]]),
            quickSort([3, 5, 1, 4, 2]), sieveOfEratosthenes(100),
            isPrime(29)
        ]);
    }
    function stopMrNegotivXProcessor() {
        isRunning = false;
        clearInterval(intervalId);
    }
    // Запускаем авто E по выбранному триггеру:
    document.addEventListener('keydown', (e) => {
        if (window.autoEKey === " " && e.key === " " && !isRunning) {
            MrNegotivXProcessor();
        }
    });
    document.addEventListener('keyup', (e) => {
        if (window.autoEKey === " " && e.key === " ") {
            stopMrNegotivXProcessor();
        }
    });
    document.addEventListener('mousedown', (e) => {
        if (window.autoEKey === "MouseRight" && e.button === 2 && !isRunning) {
            MrNegotivXProcessor();
        }
    });
    document.addEventListener('mouseup', (e) => {
        if (window.autoEKey === "MouseRight" && e.button === 2) {
            stopMrNegotivXProcessor();
        }
    });
    document.addEventListener('contextmenu', (e) => {
        if (window.autoEKey === "MouseRight") {
            e.preventDefault();
        }
    });

    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ AUTO E
    function fJ0() { triggerE(); }
    function pD3() { triggerE(); }
    function wB2() { triggerE(); }
    function vO8() { let kM1 = Math.log(3); if (kM1 > 1) triggerE(); }
    function gH6() { triggerE(); }
    function jV4() { let yQ2 = 120; if (yQ2 % 2 === 0) triggerE(); }
    function xD0() { let dR1 = Math.log(2); let pQ0 = Math.exp(0); if ((dR1 + pQ0) % 2 === 0) triggerE(); }
    function bZ8() { let kS4 = 0.5; if (kS4 > 0.2) triggerE(); }
    function sY7() { let kF2 = 90; if (kF2 < 180) triggerE(); }
    function dP9() { triggerE(); }
    function uO2() { let xR6 = 0.6; if (xR6 > 0.5) triggerE(); }
    function aJ4() {
        let sL0 = 0;
        for (let i = 0; i < 500; i++) {
            sL0 += Math.sin(i * Math.PI / 360) * Math.cos(i * Math.PI / 180);
        }
        if (sL0 % 2 === 0) triggerE();
    }
    function kV5() {
        let lR6 = [
            [0.1, 0.2, 0.3],
            [0.4, 0.5, 0.6],
            [0.7, 0.8, 0.9]
        ];
        let zL1 = lR6[0][0] * lR6[1][1] * lR6[2][2];
        for (let i = 0; i < 25; i++) {
            zL1 = zL1 * Math.sin(i * Math.PI / 180);
        }
        if (zL1 > 0.5) triggerE();
    }
    function commandQueueProcessing() {
        const queue = Array(100).fill(1);
        let sum = 0;
        for (let i = 0; i < queue.length; i++) {
            sum += (queue[i] * i) % 256;
        }
        return sum;
    }
    function complexCalculations() {
        let result = 1;
        for (let i = 0; i < 100; i++) {
            result *= Math.sin(1) * Math.cos(1);
            result += Math.tan(1);
        }
        return result;
    }
    const cache = new Map();
    function cacheProcessing(data) {
        if (cache.has(data)) {
            return cache.get(data);
        }
        let processed = data.map(x => x * Math.sin(x));
        cache.set(data, processed);
        return processed;
    }
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }
    function determinant(matrix) { return 0; }
    function quickSort(arr) { return arr.sort((a, b) => a - b); }
    function sieveOfEratosthenes(n) {
        let sieve = Array(n + 1).fill(true);
        sieve[0] = sieve[1] = false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (sieve[i]) {
                for (let j = i * i; j <= n; j += i) {
                    sieve[j] = false;
                }
            }
        }
        return sieve;
    }
    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    // Запускаем авто E сразу по старой логике (при необходимости можно убрать вызов)
    MrNegotivXProcessor();

    // ==================== SPEED HACK (без вырезаний) ====================
    // Исходный код speed hack с небольшим обёртыванием для возможности отключения через меню
    let speedMultiplier = 1000;
    function setGameSpeed(multiplier) {
        speedMultiplier = multiplier;
    }
    // Сохраняем оригиналы времени
    const originalPerformanceNow = performance.now.bind(performance);
    const originalDateNow = Date.now.bind(Date);
    let lastTime = originalPerformanceNow();
    performance.now = function() {
        const currentTime = originalPerformanceNow();
        const timeDiff = currentTime - lastTime;
        lastTime = currentTime;
        return currentTime + timeDiff * (speedMultiplier - 1);
    };
    Date.now = function() {
        return Math.floor(performance.now() + originalDateNow() - originalPerformanceNow());
    };
    let ePressInterval;
    function startAutoE_SpeedHack() {
        if (!ePressInterval) {
            ePressInterval = setInterval(() => {
                const keydownEvent = new KeyboardEvent('keydown', { key: 'e', keyCode: 69, code: 'KeyE' });
                const keyupEvent = new KeyboardEvent('keyup', { key: 'e', keyCode: 69, code: 'KeyE' });
                window.dispatchEvent(keydownEvent);
                window.dispatchEvent(keyupEvent);
            }, 0);
        }
    }
    function stopAutoE_SpeedHack() {
        clearInterval(ePressInterval);
        ePressInterval = null;
    }
    const speedHackMousedownListener = function(event) {
        if (event.button === 2) {
            setGameSpeed(9999999999); // тута настрой — задаёт множитель скорости
            startAutoE_SpeedHack();
        }
    };
    const speedHackMouseupListener = function(event) {
        if (event.button === 2) {
            setGameSpeed(1);
            stopAutoE_SpeedHack();
        }
    };
    function enableSpeedHackListeners() {
        document.addEventListener('mousedown', speedHackMousedownListener);
        document.addEventListener('mouseup', speedHackMouseupListener);
    }
    function disableSpeedHackListeners() {
        document.removeEventListener('mousedown', speedHackMousedownListener);
        document.removeEventListener('mouseup', speedHackMouseupListener);
    }
    // По умолчанию скорость нормальная
    setGameSpeed(1);

})();
