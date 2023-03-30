const dados = require('../../fixtures/dados.json')

it('Teste para gerar certificado sem Autenticacao', () => {
    cy
    .request({
        method: 'POST',
        url: 'certificados',
        headers: {  
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
        body: dados.bodycertificado,
    }).then(function(response){
        expect(response.status).to.equal(401)
    });
});

it('Teste para gerar certificado Sem Ter Certificado', () => {
    cy
    .request({
        method: 'POST',
        url: 'certificados',
        headers: {  
            'Content-Type': 'application/json',
            'token': dados.token
        },
        body: dados.bodycertificado,
        failOnStatusCode: false,
    }).then(function(response){
        expect(response.status).to.equal(422),
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body).have.property('data');
        expect(response.body.error).to.include(dados.msgfaltaresponder)
    });
});

it('Teste para gerar certificado', () => {
    cy
    .request({
        method: 'POST',
        url: 'certificados',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        body: dados.bodycertificado,
        failOnStatusCode: false,
    }).then(function(response){
        expect(response.status).to.equal(422),
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body).have.property('data');
        expect(response.body.error).to.include(dados.msgfaltaresponder)
    });
});

it('Teste para pegar certificado sem Autenticacao', () => {
    cy
    .request({
        method: 'GET',
        url: 'certificados',
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
    }).then(function(response){
        expect(response.status).to.equal(401)
    });
});

it('Teste para pegar certificado sem Ter certificado', () => {
    cy
    .request({
        method: 'GET',
        url: 'certificados',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        failOnStatusCode: false,
    }).then(function(response){
        expect(response.status).to.equal(204)
    });
});

it('Teste para pegar certificado ', () => {
    cy
    .request({
        method: 'GET',
        url: 'certificados',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        body: dados.bodycertificado,
    }).then(function(response){
        expect(response.status).to.equal(200),
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body.data).have.property('certificadoUrl');
        expect(response.body.data).have.property('percentualAcerto');
    });
});
