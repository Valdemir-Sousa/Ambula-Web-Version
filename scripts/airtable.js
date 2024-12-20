async function fetchPricingData() {
    const apiKey = 'pathUf7Yuf6itRikJ.742efdc2dd54cd391fc9b3f9751e8330ad7b3d1d2bcc0570b05a35e97c4f20c1'; // Replace with your real key
    const baseId = 'appsqaZVX0u2cl39e';     // Your base ID
    const tableName = 'Preços';

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // data.records is an array of records from Airtable
        return data.records.map(record => ({
            ...record.fields,
            RecordId: record.id
        }));
    } catch (error) {
        console.error('Error fetching pricing data:', error.message);
        return [];
    }
}

// Example function to get a specific record's fields
async function getPricingByRecordId(recordId) {
    const allData = await fetchPricingData();
    return allData.find(item => item.RecordId === recordId) || null;
}


//API KEYS - TOO SECURE AFTERWARDS
const apiKey = 'pathUf7Yuf6itRikJ.742efdc2dd54cd391fc9b3f9751e8330ad7b3d1d2bcc0570b05a35e97c4f20c1'; 
const baseId = 'appsqaZVX0u2cl39e';       
const utilizadoresTableId = 'tbly9HegklIm8MaOk';
const beneficiariosTableId = 'tblOc4fZKDHMjzVOK';
const agendamentosTableId = 'tblT5ETlTfZ1z8lBd';
const transacaoTableId = 'tblwyZz8UV5q4n89W';

/**
 * Create a Utilizador record.
 * 
 * Fields:
 * - If "para-mim":
 *    NOME = user-name input
 *    EMAIL = email input
 *    TELEMOVEL = phone-number input
 *    TERMOS = true
 *    PESO = weight input
 *    SEXO = gender input ("Feminino", "Masculino", or "Outro")
 *    IDADE = age input (number)
 *
 * - If "para-outro":
 *    NOME = responsavel-name input
 *    EMAIL = responsavel-email input
 *    TELEMOVEL = responsavel-phone input
 *    TERMOS = true
 *    PESO, SEXO, IDADE are not included here.
 *
 * @param {string} nome
 * @param {string} email
 * @param {string} telemovel
 * @param {boolean} termos
 * @param {number|null} peso
 * @param {string|null} sexo
 * @param {number|null} idade
 * @returns {Promise<object>} The Airtable response JSON
 */
async function createUtilizador(nome, email, telemovel, termos = true, peso = null, sexo = null, idade = null) {
    const url = `https://api.airtable.com/v0/${baseId}/${utilizadoresTableId}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    // Build the fields object dynamically
    const fields = {
        NOME: nome,
        EMAIL: email,
        TELEMOVEL: telemovel,
        TERMOS: termos
    };

    // Include PESO, SEXO, IDADE only if provided (for "para-mim")
    if (peso !== null && peso !== '') fields.PESO = parseFloat(peso);
    if (sexo !== null && sexo !== '') fields.SEXO = sexo;
    if (idade !== null && idade !== '') fields.IDADE = parseInt(idade, 10);

    const body = JSON.stringify({
        "records": [
            {
                "fields": fields
            }
        ]
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`Error creating Utilizador: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return result; // { records: [...] }
    } catch (error) {
        console.error('Error creating Utilizador:', error);
        return null;
    }
}

/**
 * Create a Beneficiário record.
 * This is only for the "para-outro" scenario, after creating the Utilizador (responsável).
 *
 * Fields:
 *    NOME = user-name input
 *    PESO = weight input
 *    SEXO = gender input ("Feminino", "Masculino", or "Outro")
 *    IDADE = age input (number)
 *    RESPONSAVEL = array containing the utilizador record ID [responsavelId]
 * 
 * @param {string} nome
 * @param {number} peso
 * @param {string} sexo
 * @param {number} idade
 * @param {string} responsavelId - The record ID of the Utilizador created previously
 * @returns {Promise<object>} The Airtable response JSON
 */
async function createBeneficiario(nome, peso, sexo, idade, responsavelId) {
    const url = `https://api.airtable.com/v0/${baseId}/${beneficiariosTableId}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    const fields = {
        NOME: nome,
        PESO: peso !== '' ? parseFloat(peso) : null,
        SEXO: sexo,
        IDADE: idade !== '' ? parseInt(idade, 10) : null,
        RESPONSAVEL: [responsavelId]
    };

    // Remove null fields if any
    Object.keys(fields).forEach(key => {
        if (fields[key] === null) {
            delete fields[key];
        }
    });

    const body = JSON.stringify({
        "records": [
            {
                "fields": fields
            }
        ]
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`Error creating Beneficiário: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating Beneficiário:', error);
        return null;
    }
}

/**
 * Create an Agendamento record.
 * Fields required:
 * "DATA SERVIÇO" = date-summary (convert to proper format if needed)
 * "ESTADO" = "Solicitado"
 * "ROTA" = "Ida" or "Ida + Retorno"
 * "RESPONSÁVEL" = [responsavelId]
 * "BENEFICIÁRIOS" = [beneficiarioId] if para-outro, else omit or empty array
 * "UTENTE" = user-name
 * "FORMA DE TRANSPORTE" = map from forma-summary to Airtable expected value
 * "MOTIVO" = motivo-summary
 * "MORADA DE RECOLHA" = pickup-summary
 * "MORADA DE DESTINO" = destination-summary
 * "VALOR INICIAL" = total-price-confirmation (remove € and convert to number)
 */
async function createAgendamento(dataServico, estado, rota, responsavelId, observacoes, beneficiarioId, utente, formaTransporte, motivo, moradaRecolha, comprec, moradaDestino, compdes, valorInicial, nif) {
    const url = `https://api.airtable.com/v0/${baseId}/${agendamentosTableId}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    // Build fields
    const fields = {
        "DATA SERVIÇO": dataServico,
        "ESTADO": estado,
        "ROTA": rota,
        "RESPONSÁVEL": [responsavelId],
        "OBSERVAÇÕES": observacoes,
        "UTENTE": utente,
        "FORMA DE TRANSPORTE": formaTransporte,
        "MOTIVO": motivo,
        "MORADA DE RECOLHA": moradaRecolha,
        "COMPLEMENTO RECOLHA":comprec,
        "MORADA DE DESTINO": moradaDestino,
        "COMPLEMENTO DESTINO": compdes,
        "VALOR INICIAL": valorInicial,
        "NIF": nif
    };

    // If beneficiarioId is provided, add it
    if (beneficiarioId) {
        fields["BENEFICIÁRIOS"] = [beneficiarioId];
    }

    const body = JSON.stringify({
        "records": [
            {
                "fields": fields
            }
        ]
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`Error creating Agendamento: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating Agendamento:', error);
        return null;
    }
    
}



//Create transação
async function createTransacao(plataforma, responsavelId, agendamentoId, ifThenPayId) {
    const url = `https://api.airtable.com/v0/${baseId}/${transacaoTableId}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    // Build fields
    const fields = {
        "Estado": "Pendente",  
        "Plataforma": plataforma, 
        "RESPONSÁVEL": [responsavelId],
        "Agendamento": [agendamentoId],
        "ID Transação": ifThenPayId
    };

    const body = JSON.stringify({
        "records": [
            {
                "fields": fields
            }
        ]
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`Error creating Transação: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating Transação:', error);
        return null;
    }
}

// A helper function to map the transport type from the summary to Airtable's expected value.
function mapFormaTransporte(originalText) {
    // originalText might be "Acamado / Maca", "Cadeira de rodas", "Pessoa Autónoma"
    // Airtable wants: "Acamado/maca", "Cadeira de Rodas", "Autónomo"
    const text = originalText.toLowerCase();
    if (text.includes('acamado')) return 'Acamado/Maca';
    if (text.includes('cadeira')) return 'Cadeira de Rodas';
    if (text.includes('autónoma') || text.includes('autonoma')) return 'Autónomo';
    return 'Autónomo'; // Default fallback
}

// Export these functions if needed:
window.createUtilizador = createUtilizador;
window.createBeneficiario = createBeneficiario;
window.createAgendamento = createAgendamento;
window.mapFormaTransporte = mapFormaTransporte