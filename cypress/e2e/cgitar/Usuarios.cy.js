const dados = require('../../fixtures/dados.json')

it('Teste para criar user com email errado' , () => {
    const dadosEmailErrado = {
        "usuarioNomeCompleto": dados.usuarioNomeCompleto,
        "usuarioEmail": dados.usuarioEmailErrado,
        "usuarioSenha": dados.usuarioSenha,
        "usuarioTelefone": dados.usuarioTelefone
      }

    cy
    .request({
        method: 'POST',
        url: 'usuarios',
        body: dadosEmailErrado,
        header: 'Content-Type: application/json',
        failOnStatusCode: false
    }).then(function(response){
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body).have.property('data');
        expect(response.status).to.equal(422);
        expect(response.body.error).to.equal(dados.msgerroemail)
        //cy.log(JSON.stringify(response.body))
    })
});

it('Teste para criar user dado invalido' , () => {
    const dadosSenhaErrada ={
        "usuarioNomeCompleto": dados.usuarioNomeCompleto,
        "usuarioEmail": dados.usuarioEmail,
        "usuarioSenha": dados.usuarioSenhaErrada,
        "usuarioTelefone": dados.usuarioTelefone
      }

      cy
      .request({
          method: 'POST',
          url: 'usuarios',
          body: dadosSenhaErrada,
          header: 'Content-Type: application/json',
          failOnStatusCode: false
      }).then(function(response){
          expect(response.body).have.property('message');
          expect(response.body).have.property('error');
          expect(response.body).have.property('data');
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal(dados.msgerrosenha)
          //cy.log(JSON.stringify(response.body))
      })
});

it('Teste para criar user corretamente' , () => {
    const dadoscorretosnovo ={
        "usuarioNomeCompleto": dados.usuarioNomeCompleto,
        "usuarioEmail": dados.usuarioEmailNovo,
        "usuarioSenha": dados.usuarioSenhaNovo,
        "usuarioTelefone": dados.usuarioTelefone
      }

      cy
      .request({
          method: 'POST',
          url: 'usuarios',
          body: dadoscorretosnovo,
          header: 'Content-Type: application/json',
      }).then(function(response){
          expect(response.body).have.property('message');
          expect(response.body).have.property('error');
          expect(response.body).have.property('data');
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal(dados.msgsucessouser)
          cy.log(JSON.stringify(response.body))
      })
});

it('Teste para criar user com dado ja criado' , () => {
    const dadoscorretos ={
        "usuarioNomeCompleto": dados.usuarioNomeCompleto,
        "usuarioEmail": dados.usuarioEmail,
        "usuarioSenha": dados.usuarioSenha,
        "usuarioTelefone": dados.usuarioTelefone
      }

      cy
      .request({
          method: 'POST',
          url: 'usuarios',
          body: dadoscorretos,
          header: 'Content-Type: application/json',
          failOnStatusCode: false
      }).then(function(response){
          expect(response.body).have.property('message');
          expect(response.body).have.property('error');
          expect(response.body).have.property('data');
          expect(response.status).to.equal(409);
          expect(response.body.error).to.equal(dados.msguserexiste)
          cy.log(JSON.stringify(response.body))
      })
});