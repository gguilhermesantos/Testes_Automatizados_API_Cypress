const dados = require('../../fixtures/dados.json')

it('Teste com email errado', () => {
    const dadosEmailErrado = {
        "usuarioEmail": dados.usuarioEmailErrado,
        "usuarioSenha": dados.usuarioSenha
      }

    cy
    .request({
        method: 'POST',
        url: 'autenticacao',
        body: dadosEmailErrado,
        header: 'Content-Type: application/json',
        failOnStatusCode: false
    }).then(function(response){
        expect(response.status).to.equal(401)
    });
});

it('Teste com senha errada',function(){
    const dadosSenhaErrada ={
        "usuarioEmail": dados.usuarioEmail,
        "usuarioSenha": dados.usuarioSenhaErrada
      }

      cy
      .request({
          method: 'POST',
          url: 'autenticacao',
          body: dadosSenhaErrada,
          header: 'Content-Type: application/json',
          failOnStatusCode: false
      }).then(function(response){
        expect(response.status).to.equal(401);
      });
});

it('Teste de Autenticação', function(){
    const dadoscorretos ={
        "usuarioEmail": dados.usuarioEmail,
        "usuarioSenha": dados.usuarioSenha
      }

      cy
      .request({
          method: 'POST',
          url: 'autenticacao',
          body: dadoscorretos,
          header: 'Content-Type: application/json'
      }).then(function(response){
        expect(response.body).have.property('message');
        expect(response.body).have.property('error');
        expect(response.body).have.property('data');
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(dados.msgsucessoauth)
        cy.log(response.body.data.token)
        const filename = 'cypress/fixtures/dados.json'
        cy.readFile(filename).then((obj) => {
            obj.token = response.body.data.token
            cy.writeFile(filename, obj)
        })
        //cy.writeFile(filename, {token: response.body.data.token})
          //cy.writeFile(filename, {token: response.body.data.token}, { flag: 'a+' })
          cy.log(cy.readFile(filename))
          /*
          cy.readFile(filename).then((obj) => {
            cy.log(filename)
        })
        cy.writeFile(filename, ['foo', 'bar', 'baz'], { flag: 'a+' })*/
      })

});