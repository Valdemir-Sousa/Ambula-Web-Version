//When you click on Ambula e resets to the first page.
function resetToFirstPage() {
    // Reset all sections to their default states
    document.getElementById('description-section').style.display = "block"; // Show the description
    document.getElementById('form-section').style.display = "block"; // Show the form section

    document.getElementById('resume-section').style.display = "none"; // Hide other sections
    document.getElementById('details-section').style.display = "none";
    document.getElementById('equip-section').style.display = "none";
    document.getElementById('confirm-section').style.display = "none";
    document.getElementById('pay-section').style.display = "none";

    // Reset form fields
    document.getElementById('pickup').value = '';
    document.getElementById('destination').value = '';

    // Reset date to today
    const dateInput = document.getElementById('date');
    const today = new Date();
    dateInput.value = today.toISOString().split("T")[0]; 


    // Reset image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/ambulancia.svg";
    image.alt = "Ambulance";
    image.classList.remove('fixed-image');

    // Disable the Verify button
    document.getElementById('verify-button').disabled = true;

    // Scroll to the top of the page
    window.scrollTo(0, 0);
}

// Change to Resumo Page
function changeToResumo() {
    // Get form values
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const formattedDate = formatDate(date);

    // Update the "Resumo Pedido" content
    document.getElementById('pickup-summary').textContent = `${pickup}`;
    document.getElementById('destination-summary').textContent = `${destination}`;
    document.getElementById('date-summary').textContent = `${formattedDate}`;
    document.getElementById('time-summary').textContent = `${time}`;

    // Change the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/resume.svg";
    image.alt = "Resumo";
    image.classList.remove('fixed-image');

    // Hide the description
    const description = document.getElementById('description-section');
    description.style.display = "none"; // Hide the description

    // Show "Resumo Pedido" and hide the form
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('resume-section').style.display = 'block';

    window.scrollTo(0, 0);
}

//Formatting the date to match both in first page and resumo
// Formatting the date to match both in first page and resumo
function formatDate(dateStr) {
    if (!dateStr) return ''; // Handle empty or undefined date

    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr; // Return original if format is unexpected

    return `${day}-${month}-${year}`;
}

// Set Date and Time to current
document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");

    const now = new Date(); // Date function in JS gives you the current date and time
    
    // Set the current date
    const formattedDate = now.toISOString().split("T")[0];
    dateInput.value = formattedDate;

    // Set the current time in HH:MM format
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    timeInput.value = formattedTime;

    // Date picker
    const dateInputGroup = document.getElementById('date-input-group');
    dateInputGroup.addEventListener('click', () => {
        if (typeof dateInput.showPicker === 'function') {
            dateInput.showPicker();
        } else {
            dateInput.focus();
            dateInput.click();
        }
    });

    // Time picker
    const timeInputGroup = document.getElementById('time-input-group');
    timeInputGroup.addEventListener('click', () => {
        if (typeof timeInput.showPicker === 'function') {
            timeInput.showPicker();
        } else {
            timeInput.focus();
            timeInput.click();
        }
    });
});

const verifyButton = document.getElementById('verify-button');
const pickupInput = document.getElementById('pickup');
const destinationInput = document.getElementById('destination');

//Can only click verificar trajeto if the form is filled
function checkInputs() {
    if (pickupInput.value.trim() !== '' && destinationInput.value.trim() !== '') {
        verifyButton.disabled = false;
    } else {
        verifyButton.disabled = true;
    }
}

pickupInput.addEventListener('input', checkInputs);
destinationInput.addEventListener('input', checkInputs);


function goBackToForm() {
    // Show the description section
    const description = document.getElementById('description-section');
    description.style.display = "block"; 

    // Hide "Resumo Pedido" and show the form
    document.getElementById('resume-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';

    // Reset the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/ambulancia.svg";
    image.alt = "Ambulance";
    image.classList.remove('fixed-image');

    // Reset form fields to their initial values
    document.getElementById('pickup').value = '';
    document.getElementById('destination').value = '';
    // Reset the date to today again:
    const dateInput = document.getElementById("date");
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; 
    dateInput.value = formattedDate; 


    // Re-disable the Verify Route button since fields are empty now
    const verifyButton = document.getElementById('verify-button');
    verifyButton.disabled = true;

    window.scrollTo(0, 0);
}

// Make sure that addresses are not empty
function validateForm() {
    const pickup = document.getElementById('pickup').value.trim();
    const destination = document.getElementById('destination').value.trim();

    if (!pickup || !destination) {
        console.error("Both Pickup and Destination fields must be filled out.");
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }
    return { pickup, destination };
}

// Change to page to fill in the details
function goToDetails() {
    // Hide the resumo section
    document.getElementById('resume-section').style.display = 'none';
    // Show the details section
    document.getElementById('details-section').style.display = 'block';

    // Update the image 
    const image = document.getElementById('dynamic-image');
    image.src = "Images/paciente.svg";
    image.alt = "Details";
    image.classList.add('fixed-image');

    // Hide the description
    const description = document.getElementById('description-section');
    description.style.display = "none";

    window.scrollTo(0, 0);
}

// Go back to page Resumo
function goBackToResumo() {
    document.getElementById('details-section').style.display = 'none';
    document.getElementById('resume-section').style.display = 'block';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/resume.svg";
    image.alt = "Resumo";
    image.classList.remove('fixed-image');

    window.scrollTo(0, 0);
}

//Change between "Para mim" and "Para outro" - in Recolha de Dados page
document.addEventListener('DOMContentLoaded', function() {
    const paraMimButton = document.querySelector('.option-button[data-value="para-mim"]');
    const paraOutroButton = document.querySelector('.option-button[data-value="para-outro"]');

    const userPhoneGroup = document.getElementById('user-phone-group');
    const userEmailGroup = document.getElementById('user-email-group');
    const responsavelFields = document.getElementById('responsavel-fields');

    // Function to update the form based on selection
    function updateForm(isParaOutro) {
        if (isParaOutro) {
            responsavelFields.classList.remove('hidden');
            // Hide user's phone number and email
            userPhoneGroup.classList.add('hidden');
            userEmailGroup.classList.add('hidden');
        } else {
            // Hide responsible person's fields
            responsavelFields.classList.add('hidden');
            // Show user's phone number and email
            userPhoneGroup.classList.remove('hidden');
            userEmailGroup.classList.remove('hidden');
        }
    }

    // Event listeners for the buttons
    paraMimButton.addEventListener('click', function() {
        paraMimButton.classList.add('active');
        paraOutroButton.classList.remove('active');
        updateForm(false);
    });

    paraOutroButton.addEventListener('click', function() {
        paraOutroButton.classList.add('active');
        paraMimButton.classList.remove('active');
        updateForm(true);
    });
});


// Change to New Form Page
function goToEquip() {
    // Hide the details section
    document.getElementById('details-section').style.display = 'none';

    // Show the new form section
    const newFormSection = document.getElementById('equip-section');
    newFormSection.style.display = 'block';

    // Update the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/time.svg"; // Replace with the actual path to your image
    image.alt = "New Form";
    image.classList.add('fixed-image');

    // Hide the description (if applicable)
    const description = document.getElementById('description-section');
    if (description) {
        description.style.display = "none";
    }

    window.scrollTo(0, 0);
}


// Can only pick on checkbox
const checkboxes = document.querySelectorAll('.equip-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

// Go back to page Details
function goBackToDetails() {
    document.getElementById('details-section').style.display = 'block';
    document.getElementById('equip-section').style.display = 'none';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/paciente.svg";
    image.alt = "Details";
    image.classList.add('fixed-image');

    window.scrollTo(0, 0);
}

// Change to Confirmation Page
function goToConfirm() {
    // Hide the equipment section
    document.getElementById('equip-section').style.display = 'none';

    // Show the confirmation section
    const newFormSection = document.getElementById('confirm-section');
    newFormSection.style.display = 'block';

    // Get user details with default values for optional fields
    const age = document.getElementById('age').value || 'N/A'; 
    const weight = document.getElementById('weight').value || 'N/A';
    const genderSelect = document.getElementById('gender');
    const genderText = genderSelect ? genderSelect.options[genderSelect.selectedIndex].textContent : 'N/A';
    const name = document.getElementById('user-name').value || 'N/A';
    const pickup = document.getElementById('pickup').value || 'N/A';
    const destination = document.getElementById('destination').value || 'N/A';
    const date = document.getElementById('date').value || 'N/A';
    const time = document.getElementById('time').value || 'N/A';
    const formattedDate = date !== 'N/A' ? formatDate(date) : 'N/A';

    // Transport details
    const checkboxes = document.querySelectorAll('.equip-checkbox');
    const selectedOptions = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const optionTitle = checkbox.closest('.section').querySelector('h3').textContent;
            selectedOptions.push(optionTitle);
        }
    });
    const forma = selectedOptions.join(', ') || 'N/A';
    const motivo = document.getElementById('transport-reason');
    const motivoText = motivo ? motivo.options[motivo.selectedIndex].textContent : 'N/A';

    // Extras
    const extrasCheckboxes = document.querySelectorAll('.section input[type="checkbox"]');
    const selectedExtras = [];
    let extrasTotalPrice = 0;

    extrasCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const extraSection = checkbox.closest('.section');
            const extraName = extraSection.querySelector('h3').textContent;
            const extraPriceMatch = extraName.match(/\+ €([\d,.]+)/); // Extract price using regex
            const extraPrice = extraPriceMatch ? parseFloat(extraPriceMatch[1].replace(",", ".")) : 0;

            selectedExtras.push(extraName);
            extrasTotalPrice += extraPrice; // Sum up the prices
        }
    });

    // Get transport price dynamically from the updateTotal function
    const transportPriceElement = document.getElementById('total-price');
    const transportPrice = parseFloat(transportPriceElement.textContent.replace("€", "").replace(",", "."));

    // Calculate final total price
    const totalPrice = transportPrice + extrasTotalPrice;

    // Update content
    document.getElementById('age-summary').textContent = `${age} anos`;
    document.getElementById('weight-summary').textContent = `${weight} kg`;
    document.getElementById('sexo-summary').textContent = `${genderText}`;
    document.getElementById('nome-utente-summary').textContent = `${name}`;
    document.getElementById('pickup-summary2').textContent = `${pickup}`;
    document.getElementById('destination-summary2').textContent = `${destination}`;
    document.getElementById('date-summary2').textContent = `${formattedDate}`;
    document.getElementById('time-summary2').textContent = `${time}`;
    document.getElementById('forma-summary').textContent = `${forma}`;
    document.getElementById('motivo-summary').textContent = `${motivoText}`;

    // Fill extras summary fields
    document.getElementById('extra1-summary').textContent = selectedExtras[0] || '';
    document.getElementById('extra2-summary').textContent = selectedExtras[1] || '';
    document.getElementById('extra3-summary').textContent = selectedExtras[2] || '';
    document.getElementById('extra4-summary').textContent = selectedExtras[3] || '';

    // Update total prices in the confirmation page
    const transportPriceField = document.getElementById('transport-price');
    const extrasPriceField = document.getElementById('extras-price');
    const totalPriceField = document.getElementById('total-price-confirmation');
    
    transportPriceField.innerHTML = `<strong>Transporte:</strong> ${transportPrice.toFixed(2).replace('.', ',')}€`;
    extrasPriceField.innerHTML = `<strong>Equipamentos extra:</strong> ${extrasTotalPrice.toFixed(2).replace('.', ',')}€`;
    totalPriceField.textContent = `${totalPrice.toFixed(2).replace('.', ',')}€`;

    // Scroll to the top of the page
    window.scrollTo(0, 0);
}

// Go back to page Equipment
function goBackToEquip() {
    document.getElementById('equip-section').style.display = 'block';
    document.getElementById('confirm-section').style.display = 'none';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/time.svg";
    image.alt = "Details";
    image.classList.add('fixed-image');

    window.scrollTo(0, 0);
}

// Select and Unselect Maca e Cadeira de Rodas
document.addEventListener('DOMContentLoaded', () => {
    // Select all sections within the equip-form
    const equipSections = document.querySelectorAll('.equip-form .section');
    let currentMainOption = 'acamado'; // Default selection for main transport option

    // Add click event listeners to each section
    equipSections.forEach(section => {
        section.addEventListener('click', (e) => {
            const input = section.querySelector('input');

            // Ensure clicking anywhere toggles the checkbox/radio button
            if (e.target !== input) {
                input.checked = !input.checked;
            }

            // Handle main transport options (acamado, cadeira, autonoma)
            if (section.hasAttribute('data-main')) {
                const optionName = section.getAttribute('data-main'); // Get the main option name

                if (currentMainOption === optionName) {
                    // If already selected, uncheck and clear the current selection
                    input.checked = false;
                    currentMainOption = null;
                } else {
                    // Select the clicked main option and uncheck others
                    uncheckAllMainOptions();
                    input.checked = true;
                    currentMainOption = optionName;
                }

                handleExtraDeselection(); // Handle logic to deselect extras if needed
            } else if (section.hasAttribute('data-extra')) {
                // Handle extra equipment logic (e.g., cadeira or maca)
                const extraType = section.getAttribute('data-extra'); // Get the extra type
                handleExtraSelection(extraType, input.checked); // Process extra selection and conflicts
            }
        });
    });

    /**
     * Uncheck all main transport options (e.g., acamado, cadeira, autonoma)
     */
    function uncheckAllMainOptions() {
        equipSections.forEach(sec => {
            if (sec.hasAttribute('data-main')) {
                const inp = sec.querySelector('input[type="radio"]');
                inp.checked = false; // Uncheck the radio button
            }
        });
        currentMainOption = null; // Clear the current main option
    }

    /**
     * Handle selection of extra equipment (e.g., aluguer de cadeira or maca)
     * @param {string} extraType - The type of extra equipment ("cadeira" or "maca")
     * @param {boolean} isChecked - Whether the extra is being checked or unchecked
     */
    function handleExtraSelection(extraType, isChecked) {
        const aluguerCadeira = document.querySelector('[data-extra="cadeira"] input[type="checkbox"]');
        const macaCoquille = document.querySelector('[data-extra="maca"] input[type="checkbox"]');
        const cadeiraRodasSec = document.querySelector('[data-main="cadeira"]');
        const acamadoMacaSec = document.querySelector('[data-main="acamado"]');

        if (extraType === 'cadeira') {
            if (isChecked) {
                // Select "cadeira" extra and deselect "maca"
                macaCoquille.checked = false;
                uncheckAllMainOptions(); // Ensure no other main options are selected
                cadeiraRodasSec.querySelector('input[type="radio"]').checked = true;
                currentMainOption = 'cadeira'; // Update current main option
            } else {
                // If "cadeira" is unchecked, clear the associated main option
                cadeiraRodasSec.querySelector('input[type="radio"]').checked = false;
                currentMainOption = null;
            }
        } else if (extraType === 'maca') {
            if (isChecked) {
                // Select "maca" extra and deselect "cadeira"
                aluguerCadeira.checked = false;
                uncheckAllMainOptions(); // Ensure no other main options are selected
                acamadoMacaSec.querySelector('input[type="radio"]').checked = true;
                currentMainOption = 'acamado'; // Update current main option
            } else {
                // If "maca" is unchecked, clear the associated main option
                acamadoMacaSec.querySelector('input[type="radio"]').checked = false;
                currentMainOption = null;
            }
        }
    }

    /**
     * Deselect extra equipment (e.g., aluguer de cadeira or maca) when "autonoma" is selected
     */
    function handleExtraDeselection() {
        const aluguerCadeira = document.querySelector('[data-extra="cadeira"] input[type="checkbox"]');
        const macaCoquille = document.querySelector('[data-extra="maca"] input[type="checkbox"]');

        if (currentMainOption === 'autonoma') {
            // Deselect both extras if "autonoma" is selected
            aluguerCadeira.checked = false;
            macaCoquille.checked = false;
        }
    }
});

// Change to Pay Page
function goToPay() {
    // Hide the details section
    document.getElementById('confirm-section').style.display = 'none';

    // Show the new form section
    const newFormSection = document.getElementById('pay-section');
    newFormSection.style.display = 'block';

    // Update the image
    const image = document.getElementById('dynamic-image');
    image.src = "Images/pagamento.svg"; // Replace with the actual path to your image
    image.alt = "Pagamento";
    image.classList.add('fixed-image');

    // Get the total price from the confirmation page
    const totalPriceElement = document.getElementById('total-price-confirmation');
    const totalPrice = totalPriceElement.textContent.trim();

    // Update the "PAGAR AGORA" button
    const payNowButton = document.querySelector('.pay-now-button');
    const payNowValue = document.getElementById('pay-now-value');

    if (payNowButton && payNowValue) {
        payNowValue.textContent = ` ${totalPrice}`;
    }

    // Hide the description (if applicable)
    const description = document.getElementById('description-section');
    if (description) {
        description.style.display = "none";
    }

    window.scrollTo(0, 0);
}

function goBackToConfirm() {
    document.getElementById('confirm-section').style.display = 'block';
    document.getElementById('pay-section').style.display = 'none';

    const image = document.getElementById('dynamic-image');
    image.src = "Images/recap.svg";
    image.alt = "Recap";
    image.classList.add('fixed-image');

    window.scrollTo(0, 0);
}

//Pagamento por MBWay
function toggleMbway(selectedOption) {
    const mbwayGroup = document.getElementById('mbway');
    if (selectedOption.value === 'mbway') {
        mbwayGroup.style.display = 'block'; // Make the MBWay input visible
        console.log('MBWay section displayed.');
    } else {
        mbwayGroup.style.display = 'none'; // Hide it when not selected
        console.log('MBWay section hidden.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.value !== 'mbway') {
                document.getElementById('mbway').style.display = 'none';
            }
        });
    });
});

//Clicar botão de pagar agora
async function handlePayment() {
    console.log("HandlePayment started...");

    // Declare variables for API responses in this scope
    let result = null;
    let responsavelResult = null;
    let beneficiarioResult = null;
    let agendamentoId = null; // Declare here for broader scope


    // Get the selected payment method
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) {
        console.error('No payment method selected.');
        alert('Por favor, selecione um método de pagamento antes de prosseguir.');
        return;
    }
    console.log("Selected payment method:", selectedMethod.value);

    // Handle MBWay phone number validation early
    if (selectedMethod.value === 'mbway') {
        console.log("MBWay payment method selected. Validating phone number...");
        const phoneNumberField = document.getElementById('mbway-phone-number');
        if (!phoneNumberField) {
            console.error('Phone number input field not found.');
            alert('Por favor, insira um número de telemóvel válido para concluir o pagamento via MBWay.');
            return;
        }

        const phoneNumber = phoneNumberField.value.trim();
        console.log("Phone number entered:", phoneNumber);

        if (!phoneNumber || !/^\d{9}$/.test(phoneNumber)) {
            alert('Por favor, insira um número de telemóvel válido (9 dígitos) para concluir o pagamento via MBWay.');
            phoneNumberField.focus();
            return;
        }
    }

    // Determine user option
    const paraMimActive = document.querySelector('.option-button[data-value="para-mim"].active');
    const paraOutroActive = document.querySelector('.option-button[data-value="para-outro"].active');

    console.log("Option selected:", paraMimActive ? "para-mim" : paraOutroActive ? "para-outro" : "none");

    // Gather fields
    const userName = document.getElementById('user-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const weight = document.getElementById('weight').value.trim();
    const age = document.getElementById('age').value.trim();

    const genderElement = document.getElementById('gender');
    const gender = genderElement.options[genderElement.selectedIndex].textContent;

    const responsavelName = document.getElementById('responsavel-name').value.trim();
    const responsavelPhone = document.getElementById('responsavel-phone').value.trim();
    const responsavelEmail = document.getElementById('responsavel-email').value.trim();

    console.log("Fields gathered:");
    console.log({ userName, email, phoneNumber, weight, gender, age, responsavelName, responsavelPhone, responsavelEmail });

    // Log Utilizador creation attempt
    if (paraMimActive) {
        console.log("Creating Utilizador for para-mim...");
        try {
            result = await createUtilizador(userName, email, phoneNumber, true, weight, gender, age);
            console.log("Utilizador creation response:", result);
            if (result && result.records && result.records.length > 0) {
                console.log("Utilizador created:", result.records[0]);
            }
        } catch (error) {
            console.error("Error creating Utilizador for para-mim:", error);
            return; // Exit if creation fails
        }
    } else if (paraOutroActive) {
        console.log("Creating Utilizador for responsável...");
        try {
            responsavelResult = await createUtilizador(responsavelName, responsavelEmail, responsavelPhone, true);
            console.log("Responsável creation response:", responsavelResult);
            if (responsavelResult && responsavelResult.records && responsavelResult.records.length > 0) {
                const responsavelId = responsavelResult.records[0].id;
                console.log("Responsável created with ID:", responsavelId);

                // Now create beneficiario
                console.log("Creating Beneficiário...");
                beneficiarioResult = await createBeneficiario(userName, weight, gender, age, responsavelId);
                console.log("Beneficiário creation response:", beneficiarioResult);
                if (beneficiarioResult && beneficiarioResult.records && beneficiarioResult.records.length > 0) {
                    console.log("Beneficiário created:", beneficiarioResult.records[0]);
                }
            }
        } catch (error) {
            console.error("Error creating Utilizador or Beneficiário for para-outro:", error);
            return; // Exit if creation fails
        }
    }

    // IDs for Agendamento
    let responsavelId = null;
    let beneficiarioId = null;


    if (paraMimActive) {
        if (result && result.records && result.records.length > 0) {
            responsavelId = result.records[0].id;
        }
    } else if (paraOutroActive) {
        if (responsavelResult && responsavelResult.records && responsavelResult.records.length > 0) {
            responsavelId = responsavelResult.records[0].id;
        }
        if (beneficiarioResult && beneficiarioResult.records && beneficiarioResult.records.length > 0) {
            beneficiarioId = beneficiarioResult.records[0].id;
        }
    }

    let utente = null;

    if (paraMimActive) {
        utente = "PRÓPRIO";


    } else if (paraOutroActive) {
        utente = "BENEFICIÁRIO";
    }

    const dateInput = document.getElementById("date").value.trim();
    const timeInput = document.getElementById("time").value.trim();
    const dataServicoISO = `${dateInput}T${timeInput}:00`; // ISO 8601 format

    console.log("Formatted Date and Time for Agendamento:", dataServicoISO);

    const estado = "Solicitado";
    const roundTripChecked = document.getElementById('round-trip-toggle').checked;
    const rota = roundTripChecked ? "Ida + Retorno" : "Ida";
    const formaText = document.getElementById('forma-summary').textContent.trim();
    const formaTransporte = mapFormaTransporte(formaText);
    const motivo = document.getElementById('motivo-summary').textContent.trim();
    const moradaRecolha = document.getElementById('pickup-summary2').textContent.trim();
    const moradaDestino = document.getElementById('destination-summary2').textContent.trim();
    const valorInicialStr = document.getElementById('total-price-confirmation').textContent.trim();
    const valorInicialNum = parseFloat(valorInicialStr.replace("€", "").replace(",", ".")); //MUDAR AQUI PARA TESTESMBWAY
    const observacoes = document.getElementById('observacoes').value.trim();
    const compdes = document.getElementById('compdes').value.trim();
    const comprec = document.getElementById('comprec').value.trim();
    const nif = document.getElementById('nif').value.trim();


    const mbwayPhoneNumber = document.getElementById('mbway-phone-number').value.trim();

    console.log("Data being sent to createAgendamento:");
    console.log({
        dataServicoISO, estado, rota, responsavelId, beneficiarioId, utente, formaTransporte, motivo, moradaRecolha, moradaDestino, valorInicialNum, observacoes, compdes, comprec, nif
    });


    try {
        const agendamentoResult = await createAgendamento(
            dataServicoISO,
            estado,
            rota,
            responsavelId,
            observacoes,
            beneficiarioId,
            utente,
            formaTransporte,
            motivo,
            moradaRecolha,
            comprec,
            moradaDestino,
            compdes,
            valorInicialNum,
            nif
        );
        console.log("Agendamento creation response:", agendamentoResult);
        // Extract agendamentoId

        if (agendamentoResult && agendamentoResult.records && agendamentoResult.records.length > 0) {
            agendamentoId = agendamentoResult.records[0].id;
            console.log("Agendamento created with ID:", agendamentoId);
        } else {
            console.error("No Agendamento record created.");
            return; // Stop if no agendamento was created
        }
    } catch (error) {
        console.error("Error creating Agendamento:", error);
    }

    // Validation passed; hide unnecessary elements
    document.getElementById('forma-pagamento-h3').style.display = 'none';
    document.getElementById('NIF').style.display = 'none';
    document.getElementById('pay-now-button').style.display = 'none';

    // Get the summary box
    const summaryBox = document.querySelector('#pay-section .summary-box');
    if (!summaryBox) {
        console.error('Summary box not found.');
        alert('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.');
        return;
    }
    // Clear the summary box content
    summaryBox.innerHTML = '';

    // Get the total price
    const totalPriceElement = document.getElementById('total-price-confirmation');
    if (!totalPriceElement) {
        console.error('Total price element not found.');
        alert('Ocorreu um erro ao obter o valor total. Por favor, tente novamente.');
        return;
    }

    const totalPrice = totalPriceElement.textContent ? totalPriceElement.textContent.trim() : 'N/A';

   

    // Handle payment methods
    if (selectedMethod.value === 'multibanco') {
        try {
            const refData = await generateMultibancoReference(responsavelId, valorInicialNum, userName, phoneNumber);
            
            console.log("Multibanco Reference Data:", refData);
            const entidade = refData.Entity; // Replace with API value
            const referencia = refData.Reference; // Replace with API value
    
            // Determine plataforma and ifThenPayId
            const plataforma = "TRANSFERÊNCIA";
            const ifThenPayId = refData.RequestId; // Check IfThenPay response for the correct field name

            // Create Transação
            const transacaoResult = await createTransacao(plataforma, responsavelId, agendamentoId, ifThenPayId);
            console.log("Transação creation response (Multibanco):", transacaoResult);

            summaryBox.innerHTML = `
                <p>A sua referência para pagamento Multibanco foi gerada com sucesso. Utilize os dados abaixo para concluir o pagamento:</p>
                <ul>
                    <li><strong>Entidade:</strong> ${entidade}</li>
                    <li><strong>Referência:</strong> ${referencia}</li>
                    <li><strong>Valor:</strong> ${totalPrice}</li>
                </ul>
                <p>Após o pagamento, receberá um email de confirmação. Obrigado por utilizar os nossos serviços.</p>
            `;
            
            // You can now display the Entity and Reference to the user.
        } catch (error) {
            console.error("Error generating Multibanco reference:", error);
            alert('Ocorreu um erro ao gerar a referência Multibanco. Por favor, tente novamente mais tarde.');
        }
    
      
    } else if (selectedMethod.value === 'mbway') {
        let timeLeft = 4 * 60; // 4 minutes in seconds
        try {
            const mbwayData = await generateMBWayPayment(responsavelId, valorInicialNum, mbwayPhoneNumber, email, motivo);
            console.log("MBWay Payment Data:", mbwayData);
            window.currentMBWayRequestId = mbwayData.RequestId;
            // You can now handle the MBWay transactionId and status.
            // Determine plataforma and ifThenPayId
            const plataforma = "MBWay";
            const ifThenPayId = mbwayData.RequestId; // Check MBWay response fields

            // Create Transação
            const transacaoResult = await createTransacao(plataforma, responsavelId, agendamentoId, ifThenPayId);
            console.log("Transação creation response (MBWay):", transacaoResult);
            

        } catch (error) {
            console.error("Error generating MBWay payment:", error);
            alert('Ocorreu um erro ao processar o pagamento MBWay. Por favor, tente novamente mais tarde.');
        }
        summaryBox.innerHTML = `
            <p>O pagamento via MBWay está a ser processado. Conclua a transação na sua aplicação MBWay antes que o tempo expire:</p>
            <p id="timer"><strong>Tempo restante:</strong> 04:00</p>
            <p>Após a confirmação do pagamento, enviaremos um email com os detalhes. Obrigado por confiar nos nossos serviços.</p>
            <!-- Button -->
                <div class="action-buttons" id="aguardar-button">
                    <button class="continue-button" id="ja-paguei-button" style="background-color:#bcbcbc;" onclick="confirmMBWayStatus()">JÁ PAGUEI</button>
                </div>
        `;

        const timerElement = document.getElementById('timer');
        if (!timerElement) {
            console.error('Timer element not found.');
            return;
        }

        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const seconds = (timeLeft % 60).toString().padStart(2, '0');
            timerElement.textContent = `Tempo restante: ${minutes}:${seconds}`;

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = 'O tempo expirou. Tente novamente.';
            }
        }, 1000);
    } else if (selectedMethod.value === 'link') {
        try {
            const linkData = await  generateCreditCardPayment(responsavelId, valorInicialNum, userName, email) 
            
           
            console.log("Payment Link Data:", linkData);

            // Determine plataforma and ifThenPayId
            const plataforma = "Link de Pagamento";
            const ifThenPayId = linkData.RequestId; // Check Payment Link response fields

            // Create Transação
            const transacaoResult = await createTransacao(plataforma, responsavelId, agendamentoId, ifThenPayId);
            console.log("Transação creation response (Link):", transacaoResult);

    
            // Extract the payment link from linkData. 
            // Check IfThenPay documentation for the exact field name.
            const paymentLink = linkData.PaymentUrl; // or linkData.paymentUrl if that's how the API returns it.
    
            summaryBox.innerHTML = `
                <p>Por favor complete o pagamento:</p>
                    <iframe src="${paymentLink}" 
                            style="width:100%; height:600px; border:none;" 
                            allow="payment" 
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups">
                    </iframe>
                <p>Após a confirmação do pagamento, enviaremos um email de confirmação. Obrigado por escolher os nossos serviços.</p>
                <!-- Button -->
                <div class="action-buttons" id="aguardar-button">
                    <button class="continue-button" style="background-color: #bcbcbc;">AGUARDANDO PAGAMENTO</button>
                </div>
            `;
        } catch (error) {
            console.error("Error generating payment link:", error);
            alert('Ocorreu um erro ao gerar o link de pagamento. Por favor, tente novamente mais tarde.');
        }
    } else {
        alert('Método de pagamento inválido. Por favor, tente novamente.');
    }

    // Change the back button's onclick action
    const backButton = document.getElementById('back-button-payment');
    if (backButton) {
        backButton.setAttribute('onclick', 'goBackToPaymentDetails()');
    }

}




//Go back to payment page details
function goBackToPaymentDetails() {
    const paySection = document.getElementById('pay-section');
    if (!paySection) {
        console.error('Main content container not found.');
        return;
    }

    // Replace the content with the payment HTML
    paySection.innerHTML = `
        <div id="pay-section" class="pay-page" style="display: block; padding: 0; width: 100%;">
            <!-- Header -->
            <header class="resume-header">
                <button class="back-button" onclick="goBackToConfirm()" id="back-button-payment">
                  <img src="Images/back.svg" alt="Back">
                </button>
                <h2>Pagamento</h2>
            </header>

            <!-- Progress Bar -->
            <div class="progress-bar">
                <span class="progress active"></span>
                <span class="progress active"></span>
                <span class="progress active"></span>
                <span class="progress active"></span>
                <span class="progress active"></span>
            </div>
            <p class="progress-title">Pagamento</p>

            <!-- Payment Method Section -->
            <div class="summary-section">
                <h3 id="forma-pagamento-h3">Forma de pagamento</h3>
                <div class="summary-box">
                    <!-- Pagamento referência multibanco -->
                    <label class="payment-option">
                        <div class="main-content">
                            <div class="option-content">
                                <img src="Images/icon-multibanco.png" alt="Multibanco Icon">
                                <p>Pagamento referência multibanco</p>
                            </div>
                            <div class="radio-container">
                                <input type="radio" name="payment-method" value="multibanco" checked>
                            </div>
                        </div>
                    </label>
                    
                    <!-- Pagamento MBWay -->
                    <label class="payment-option">
                        <div class="main-content">
                            <div class="option-content">
                                <img src="Images/icon-mbway.png" alt="MBWay Icon">
                                <p>Pagamento MBWay</p>
                            </div>
                            <div class="radio-container">
                                <input type="radio" name="payment-method" value="mbway" onclick="toggleMbway(this)">
                            </div>
                        </div>
                        <div class="additional-input" id="mbway">
                            <label for="mbway-phone-number">Número de Telemóvel:</label>
                            <input type="text" id="mbway-phone-number" placeholder="ex: 987 654 321">
                        </div>
                    </label>

                    <!-- Pagamento Link -->
                    <label class="payment-option">
                        <div class="main-content">
                            <div class="option-content">
                                <img src="Images/icon-link.svg" alt="Link Icon">
                                <p>Pagamento Link</p>
                            </div>
                            <div class="radio-container">
                                <input type="radio" name="payment-method" value="link">
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            
            <div class="input-group" id="NIF">
                <label for="phone-number">NIF (Opcional):</label>
                <input type="text" id="phone-number" placeholder="ex: 987 654 321">
            </div>

            <!-- Button -->
            <div class="action-buttons" id="pay-now-button">
                <button class="continue-button pay-now-button" onclick="handlePayment()">PAGAR AGORA<span id="pay-now-value"></span></button>
                <!-- <a href="#" class="cancel-link">Cancelar</a> -->
            </div>
        </div>
    `;
}



//Botão pagamento efetuado com sucesso
//<!-- Button -->
//                <div class="action-buttons" id="sucesso-button">
//                    <button class="continue-button" style="background-color: #E8F4ED; color: #4FA071;" >PAGAMENTO EFETUADO COM SUCESSO</button>
//                </div>

//Botão pagamento recusado
//<!-- Button -->
//                <div class="action-buttons" id="recusao-button">
//                    <button class="continue-button" style="background-color: #FBECEF; color: #D74560;" >PAGAMENTO RECUSADO</button>
//                </div>


//APIs------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Google Autocomplete
    initializePlacesAutocomplete();
    
    // Load pricing variables from Airtable
    await loadPricingFromAirtable('recBG03zIEKzXcj1V'); // Use the actual record ID
    
    // At this point, basePrice, pricePerKm, cleaningFee are updated.
    // Any calculations that depend on these should now use the updated values.
});

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded, now calling Airtable...');
    const recordId = 'recBG03zIEKzXcj1V'; // or your actual record ID
    await loadPricingFromAirtable(recordId);
    // After loading from Airtable, basePrice should be updated.
    console.log('basePrice after Airtable:', basePrice);
});
