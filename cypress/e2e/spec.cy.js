describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });
});

it('Marca todas as tarefas como completas', () => {
  cy.visit('http://127.0.0.1:7001'); 

  cy.get('.new-todo')
    .type('Tarefa 1{enter}')
    .type('Tarefa 2{enter}')
    .type('Tarefa 3{enter}');

  cy.get('.todo-list li .toggle')
    .check({ multiple: true }); // Marca todas as checkboxes de uma vez

  cy.contains('Completed').click();
  cy.get('.todo-list li')
    .should('have.length', 3); // Verifica se todas as tarefas estão visíveis na lista de completadas
});

it('Edita uma tarefa existente', () => {
  cy.visit('http://127.0.0.1:7001'); 

  cy.get('.new-todo')
    .type('Tarefa a ser editada{enter}');

  cy.contains('Tarefa a ser editada')
    .dblclick(); // Dá um duplo clique na tarefa para editar

  cy.get('.todo-list li .edit')
    .type('{selectall}Tarefa editada{enter}'); // Seleciona todo o texto e digita a nova descrição

  cy.get('.todo-list li')
    .should('have.length', 1)
    .first()
    .should('have.text', 'Tarefa editada'); // Verifica se a tarefa foi editada corretamente
});

it('Marca e desmarca uma tarefa como completa', () => {
  cy.visit('http://127.0.0.1:7001'); 

  cy.get('.new-todo')
    .type('Tarefa para marcar e desmarcar{enter}');

  cy.get('.todo-list li .toggle')
    .click(); // Marca a tarefa como completa

  cy.contains('Active').click(); // Filtra por tarefas ativas
  cy.get('.todo-list li')
    .should('have.length', 0); // Verifica se a tarefa não está visível na lista de ativas

  cy.contains('Completed').click(); // Filtra por tarefas completas
  cy.get('.todo-list li')
    .should('have.length', 1)
    .first()
    .should('have.text', 'Tarefa para marcar e desmarcar'); // Verifica se a tarefa está na lista de completas

  cy.contains('Clear completed').click(); // Limpa as tarefas completas
  cy.get('.todo-list li')
    .should('have.length', 0); // Verifica se a lista de completas está vazia
});