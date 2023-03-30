const dados = require('../../fixtures/dados.json')

it('Teste para buscar pergunta sem Autenticacao', () => {
    cy
    .request({
        method: 'GET',
        url: 'perguntas',
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
    }).then(function(response){
        expect(response.status).to.equal(401)
    });
});

it('Teste para buscar pergunta com Autenticacao errada', () => {
    cy
    .request({
        method: 'GET',
        url: 'perguntas',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.usuarioTelefone
        },
        failOnStatusCode: false,
    }).then(function(response){
        expect(response.status).to.equal(500)
    });
});
it('Teste para buscar pergunta correta', () => {
    cy
    .request({
        method: 'GET',
        url: 'perguntas',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        }
    }).then(function(response){
        expect(response.status).to.equal(200),
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body.data).have.property('perguntaId');
        expect(response.body.data).have.property('perguntaDescricao');
        expect(response.body.message).to.equal(dados.msgperguntaselecionada)
        const filename = 'cypress/fixtures/dados.json'
        cy.readFile(filename).then((obj) => {
            obj.ultimaperguntaID = response.body.data.perguntaId
            obj.ultimaperguntaDescricao = response.body.data.perguntaDescricao
            cy.writeFile(filename, obj)
        })
    });
});

it('Teste para buscar pergunta enviando pergunta exedente', () => {
    //só será usado quando responder mais de 10 perguntas 
    /*cy
    .request({
        method: 'GET',
        url: 'perguntas',
        headers: {  
            'Content-Type': 'application/json',
            'token': dados.token
        }
    }).then(function(response){
        expect(response.status).to.equal(204)
    });*/
});