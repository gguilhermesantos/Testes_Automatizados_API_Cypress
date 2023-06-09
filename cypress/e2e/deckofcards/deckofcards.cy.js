it('Shuffle the Cards', () => {
    cy.request('GET','api/deck/new/shuffle/?deck_count=1');
})

it('Shuffle the Cards',function(){
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