const dados = require('../../fixtures/dados.json')

it('Teste com email errado', () => {
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

it('Teste com senha errada',function(){
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

it('Teste de Autenticação', function(){
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