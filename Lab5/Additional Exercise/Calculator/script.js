const display = document.getElementById('display'); // Lấy phần tử hiển thị của máy tính
const buttons = document.querySelectorAll('.button'); // Lấy tất cả các nút

let currentInput = '0'; // Lưu trữ số hiện tại đang được nhập
let firstOperand = null; // Lưu trữ toán hạng đầu tiên
let operator = null; // Lưu trữ toán tử đã chọn
let waitingForSecondOperand = false; // Cờ để kiểm tra xem có đang chờ toán hạng thứ hai không

// Cập nhật màn hình hiển thị
function updateDisplay() {
    display.textContent = currentInput;
}

// Xử lý đầu vào số
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay();
}

// Xử lý đầu vào dấu thập phân
function inputDecimal(dot) {
    if (waitingForSecondOperand) {
        currentInput = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    // Chỉ thêm dấu thập phân nếu nó chưa có trong số hiện tại
    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
    updateDisplay();
}

// Xử lý nút xóa (AC)
function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Thực hiện phép tính
function performCalculation() {
    const inputValue = parseFloat(currentInput);

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        let result;
        // Sử dụng switch case để thực hiện các phép toán
        switch (operator) {
            case '+':
                result = firstOperand + inputValue;
                break;
            case '-':
                result = firstOperand - inputValue;
                break;
            case '*':
                result = firstOperand * inputValue;
                break;
            case '/':
                if (inputValue === 0) {
                    alert("Cannot divide by zero!"); // Xử lý chia cho 0
                    clearCalculator();
                    return;
                }
                result = firstOperand / inputValue;
                break;
            default:
                return;
        }
        currentInput = String(result);
        firstOperand = result;
    }
    waitingForSecondOperand = true;
    updateDisplay();
}

// Xử lý khi nút toán tử được nhấp
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    // Nếu đã có toán tử và đang chờ toán hạng thứ hai, cập nhật toán tử
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    // Nếu chưa có toán hạng đầu tiên, gán giá trị hiện tại cho nó
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        // Nếu đã có toán tử và toán hạng đầu tiên, thực hiện phép tính
        performCalculation();
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Thêm trình lắng nghe sự kiện cho tất cả các nút
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { value } = event.target.dataset; // Lấy giá trị data-value
        const { action } = event.target.dataset; // Lấy giá trị data-action

        if (value) { // Nếu là nút số hoặc dấu thập phân
            inputDigit(value);
        } else if (action) { // Nếu là nút hành động (toán tử, clear, equals)
            switch (action) {
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    handleOperator(event.target.textContent); // Dùng textContent để lấy dấu +, -, *, /
                    break;
                case 'clear':
                    clearCalculator();
                    break;
                case 'equals':
                    performCalculation();
                    break;
                case 'decimal': // Thêm case cho dấu thập phân nếu bạn muốn data-action="decimal" thay vì data-value="."
                    inputDecimal('.');
                    break;
            }
        }
    });
});

// Khởi tạo màn hình hiển thị
updateDisplay();