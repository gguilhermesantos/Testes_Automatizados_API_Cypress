const dados = require('../../fixtures/dados.json')

it('Teste para enviar respostas sem autenticacao', () => {
    cy
    .request({
        method: 'POST',
        url: 'respostas',
        headers: {
            'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
        body: {
            "perguntaId": dados.ultimaperguntaID,
            "respostaDada": "true"
        }
    }).then(function(response){
        expect(response.status).to.equal(401)
    });
});

it('Teste para enviar respostas com pergunta que não existe', () => {
    cy
    .request({
        method: 'POST',
        url: 'respostas',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        failOnStatusCode: false,
        body: {
            "perguntaId": null,
            "respostaDada": true
        }
    }).then(function(response){
        expect(response.status).to.equal(400)
    });
});

it('Teste para enviar respostas diferente de true or false', () => {
    cy
    .request({
        method: 'POST',
        url: 'respostas',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        failOnStatusCode: false,
        body: {
            "perguntaId": dados.ultimaperguntaID,
            "respostaDada": null
        }
    }).then(function(response){
        expect(response.status).to.equal(400)
    });
});

it('Teste para enviar respostas corretamente', () => {
    /*cy
    .request({
        method: 'POST',
        url: 'respostas',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        failOnStatusCode: false,
        body: {
            "perguntaId": dados.ultimaperguntaID,
            "respostaDada": true
        }
    }).then(function(response){
        expect(response.status).to.equal(201)
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body.data).have.property('respostaDada');
        expect(response.body.data).have.property('perguntaId');
         expect(response.body.message).to.equal(dados.msgrespadicionada);
    });*/
});

it('Teste para enviar respostas ja respondida', () => {
    cy
    .request({
        method: 'POST',
        url: 'respostas',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        failOnStatusCode: false,
        body: {
            "perguntaId": dados.usuarioTelefone,
            "respostaDada": true
        }
    }).then(function(response){
        expect(response.status).to.equal(409)
    });
});

it('Teste para pegar respostas sem autenticação', () => {
    cy
    .request({
        method: 'GET',
        url: 'respostas',
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
    }).then(function(response){
        expect(response.status).to.equal(401)
    });
});

it('Teste para pegar respostas corretamente', () => {
    cy
    .request({
        method: 'GET',
        url: 'respostas',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        }
    }).then(function(response){
        expect(response.status).to.equal(200);
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body.data[0]).have.property('respostaId');
        expect(response.body.data[0]).have.property('perguntaId');
        expect(response.body.data[0]).have.property('perguntaDescricao');
        expect(response.body.data[0]).have.property('respostaDada');
        expect(response.body.message).to.equal(dados.msglistaresposta);
        const filename = 'cypress/fixtures/dados.json'
        cy.readFile(filename).then((obj) => {
            obj.ultimarespostaId = response.body.data[0].respostaId
            cy.writeFile(filename, obj)
        })
    });
});

it('Teste para editar respostas sem autenticação', () => {
    cy
    .request({
        method: 'PUT',
        url: 'respostas/'+dados.ultimarespostaId,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
        body: {
            "respostaDada": false
        }
    }).then(function(response){
        expect(response.status).to.equal(401)
    });
});

it('Teste para editar respostas em pergunta não existente', () => {
    cy
    .request({
        method: 'PUT',
        url: 'respostas/1234',
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        failOnStatusCode: false,
        body: {
            "respostaDada": false
        }
    }).then(function(response){
        expect(response.status).to.equal(404)
    });
});

it('Teste para editar respostas diferente de true ou false', () => {
    cy
    .request({
        method: 'PUT',
        url: 'respostas/'+ dados.ultimarespostaId,
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        failOnStatusCode: false,
        body: {
            "respostaDada": null
        }
    }).then(function(response){
        expect(response.status).to.equal(400)
    }); 
});

it('Teste para editar respostas corretamente', () => {
    cy
    .request({
        method: 'PUT',
        url: 'respostas/'+ dados.ultimarespostaId,
        headers: {
            'Content-Type': 'application/json',
            'token': dados.token
        },
        body: {
            "respostaDada": false
        }
    }).then(function(response){
        expect(response.status).to.equal(200)
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body.data).have.property('respostaId');
        expect(response.body.data).have.property('perguntaId');
        expect(response.body.data).have.property('perguntaDescricao');
        expect(response.body.data).have.property('respostaDada');
        expect(response.body.message).to.equal(dados.msgrespalterada);
    }); 
});