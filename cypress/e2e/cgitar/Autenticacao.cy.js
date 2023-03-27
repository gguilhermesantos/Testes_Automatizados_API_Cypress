it('Teste com email errado', () => {
    cy.request('GET','api/deck/new/shuffle/?deck_count=1');
})

it('Teste com senha errada',function(){
    cy.request({
        method: 'GET',
        url: 'api/deck/new/shuffle/?deck_count=1',
        }).then(function(response){
            expect(response.body).have.property('success');
            expect(response.body).have.property('deck_id');
            expect(response.body).have.property('remaining');
            expect(response.body).have.property('shuffled');
            expect(response.status).to.equal(200);
            cy.log(JSON.stringify(response.body))
        });
});

it('Teste de Autenticação', function(){

});