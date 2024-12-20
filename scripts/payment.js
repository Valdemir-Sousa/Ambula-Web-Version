// payment.js

// Replace with your real keys (not secure to put here in production)
const IF_THEN_PAY_MB_KEY = "KQK-578261";
const IF_THEN_PAY_LINK_KEY = "AWXN-360161";
const IF_THEN_PAY_MBWAY_KEY = "XLM-091312";
const IF_THEN_PAY_CC_KEY = "LQG-147826"; 

// Generate Multibanco Reference
async function generateMultibancoReference(orderId, amount, clientName, clientPhone) {
    const url = 'https://api.ifthenpay.com/multibanco/reference/init';
    const body = {
        mbKey: IF_THEN_PAY_MB_KEY,
        orderId: orderId,
        amount: amount,
        clientName: clientName,
        clientPhone: clientPhone
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error('Erro ao gerar referência multibanco:', data);
        throw new Error(data.message || 'Falha ao obter referência multibanco.');
    }

    console.log('Multibanco Reference Data:', data);
    return data; // { Entity, Reference, Amount, ... }
}

// Generate MBWay Payment Request
async function generateMBWayPayment(orderId, amount, phoneNumber, email, motivo) {
    // Check IfThenPay docs for the exact MBWay endpoint and body format.
    // The following is an example placeholder:
    const url = 'https://api.ifthenpay.com/spg/payment/mbway';
    const body = {
        mbWayKey: IF_THEN_PAY_MBWAY_KEY,
        orderId: orderId,
        amount: amount,
        mobileNumber: phoneNumber,
        email: email,
        description: motivo
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error('Erro ao gerar pagamento MBWay:', data);
        throw new Error(data.message || 'Falha ao obter pagamento MBWay.');
    }

    console.log('MBWay Payment Data:', data);
    return data; // { transactionId, status, etc. }
}

// Generate Credit Card Payment Request
async function generateCreditCardPayment(orderId, amount, clientName, clientEmail) {
    const url = `https://api.ifthenpay.com/creditcard/init/${IF_THEN_PAY_CC_KEY}`; 
    const body = {
        orderId: orderId,
        amount: amount,
        clientName: clientName,
        clientEmail: clientEmail,
        successUrl: 'https://www.ambula.pt/pagamento-aprovado/',
        errorUrl: 'https://www.ambula.pt/pagamento-recusado/',
        cancelUrl: 'https://www.ambula.pt/pagamento-cancelado/',
        language: 'pt'
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error('Erro ao gerar pagamento com cartão de crédito:', data);
        throw new Error(data.message || 'Falha ao processar pagamento com cartão de crédito.');
    }

    console.log('Credit Card Payment Data:', data);
    return data; // { PaymentUrl, status, etc. }
}

// Confirm MBWay Status
async function confirmMBWayStatus() {
    console.log("Checking MBWay payment status...");

    try {
        // Call the confirmMBWayPayment function from payment.js
        const data = await confirmMBWayPayment();
        console.log('MBWay Status Response:', data);

        const summaryBox = document.querySelector('#pay-section .summary-box');
        if (!summaryBox) {
            console.error('summaryBox not found.');
            return;
        }

        if (data.Status === '000') {
            // Payment confirmed
            summaryBox.innerHTML = `
                <p>Pagamento confirmado com sucesso!</p>
                <div class="action-buttons" id="sucesso-button">
                    <button class="continue-button" style="background-color: #E8F4ED; color: #4FA071;" disabled>PAGAMENTO EFETUADO COM SUCESSO</button>
                </div>
            `;
        } else if (data.Status === '101') {
            // Payment expired
            summaryBox.innerHTML = `
                <p>O tempo para efetuar o pagamento expirou. Por favor, tente novamente.</p>
                <div class="action-buttons" id="expirado-button">
                    <button class="continue-button" style="background-color: #FBECEF; color: #D74560;" disabled>PAGAMENTO EXPIRADO</button>
                </div>
            `;
        } else if (data.Status === '020' || data.Status === '122') {
            // Payment rejected or declined
            summaryBox.innerHTML = `
                <p>O pagamento foi recusado. Por favor, tente novamente.</p>
                <div class="action-buttons" id="recusado-button">
                    <button class="continue-button" style="background-color: #FBECEF; color: #D74560;" disabled>PAGAMENTO RECUSADO</button>
                </div>
            `;
        } else {
            // Any other status
            alert(`Estado do pagamento: ${data.Message} (código: ${data.Status})`);
        }
    } catch (error) {
        console.error("Erro ao verificar o status MBWay:", error);
        alert('Ocorreu um erro ao verificar o estado do pagamento MBWay. Tente novamente mais tarde.');
    }
}


// Confirm MBWay payment
async function confirmMBWayPayment() {
    // Replace these with the actual mbWayKey and requestId
    // You must store the RequestId from when you initiated the MBWay payment.
    // For example, if mbwayData.RequestId = 'i2szvoUfPYBMWdSxqO3n', store it globally or pass it somehow.
    const requestId = window.currentMBWayRequestId;// The RequestId you got from generateMBWayPayment

    const url = `https://api.ifthenpay.com/spg/payment/mbway/status?mbWayKey=${IF_THEN_PAY_MBWAY_KEY}&requestId=${requestId}`;
    const options = { method: 'GET' };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    // Return the data so confirmMBWayStatus can process it
    return data;
}
