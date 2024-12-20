// // Constants for Airtable API
// const apiKey = 'pathUf7Yuf6itRikJ.742efdc2dd54cd391fc9b3f9751e8330ad7b3d1d2bcc0570b05a35e97c4f20c1'; 
// const baseId = 'appsqaZVX0u2cl39e';
// const agendamentosTable = 'Agendamentos';

// // Function to create a new "Agendamentos" record in Airtable
// async function createAgendamento(dataObj) {
//     const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(agendamentosTable)}`;

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ fields: dataObj })
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error creating Agendamento:', errorData);
//         throw new Error(`Failed to create Agendamento: ${response.statusText}`);
//     }

//     const record = await response.json();
//     console.log('Agendamento created successfully:', record);
//     return record;
// }

// // Function to handle the "PAGAR AGORA" button click
// async function handlePayment() {
//     console.log('PAGAR AGORA button clicked.');

//     // Step 1: Gather data from the form fields
//     const nome = document.getElementById('user-name').value;
//     const email = document.getElementById('email').value;
//     const telemovel = document.getElementById('phone-number').value;
//     const nomeUtente = document.getElementById('user-name').value;
//     const dataServico = document.getElementById('date').value; // Ensure date is in correct format
//     const observacoes = document.getElementById('observacoes-field').value || 'N/A';
//     const formaTransporte = document.getElementById('forma-summary').value || 'N/A';
//     const motivo = document.getElementById('motivo-summary').value || 'N/A';
//     const moradaRecolha = document.getElementById('pickup-summary').value || 'N/A';
//     const moradaDestino = document.getElementById('destination-summary').value || 'N/A';
//     const valorServico = parseFloat(document.getElementById('total-price-confirmation').value) || 0;

//     const dataObj = {
//         "DATA SERVIÇO": dataServico,
//         "ESTADO": "Solicitado",
//         "ROTA": "Ida",
//         "RESPONSÁVEL": nome,
//         "BENEFICIÁRIOS": nomeUtente,
//         "UTENTE": "BENEFICIÁRIO",
//         "FORMA DE TRANSPORTE": formaTransporte,
//         "MOTIVO": motivo,
//         "MORADA DE RECOLHA": moradaRecolha,
//         "MORADA DE DESTINO": moradaDestino,
//         "VALOR INICIAL": valorServico
//     };

//     console.log('Data Object to be sent to Airtable:', dataObj);

//     try {
//         // Step 2: Create the Agendamento record in Airtable
//         const record = await createAgendamento(dataObj);
//         console.log('Agendamento record created:', record);

//         // Step 3: Get the record ID for the newly created Agendamento
//         const recordId = record.id;
//         console.log('Record ID:', recordId);

//         // Step 4: Call the payment logic using the record ID
//         const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
//         if (!selectedMethod) {
//             alert('Por favor, selecione um método de pagamento antes de prosseguir.');
//             return;
//         }

//         if (selectedMethod.value === 'multibanco') {
//             console.log('Processing Multibanco payment...');
//             const data = await generateMultibancoReference(recordId, valorServico, nome, telemovel);
//             console.log('Multibanco data:', data);
//             alert('Referência Multibanco gerada com sucesso!');
//         } else if (selectedMethod.value === 'mbway') {
//             console.log('Processing MBWay payment...');
//             const phoneNumber = document.getElementById('mbway-phone-number').value.trim();
//             const data = await generateMBWayPayment(recordId, valorServico, phoneNumber);
//             console.log('MBWay data:', data);
//             alert('Pagamento MBWay iniciado com sucesso!');
//         } else if (selectedMethod.value === 'link') {
//             console.log('Processing payment link...');
//             const data = await generatePaymentLink(recordId, valorServico);
//             console.log('Payment link data:', data);
//             alert('Link de pagamento gerado com sucesso!');
//         } else {
//             alert('Método de pagamento inválido. Por favor, tente novamente.');
//         }
//     } catch (error) {
//         console.error('Error during payment process:', error.message);
//         alert('Ocorreu um erro ao processar o pagamento. Verifique o console para mais detalhes.');
//     }
// }
