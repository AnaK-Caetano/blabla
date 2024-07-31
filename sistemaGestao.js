const teclado = require("readline-sync");

lista_de_propriedades = [];
lista_de_organizacoes = [];



function menuPrincipal() {
    let escolhaPrincipal;

    do {
        console.log('=====MENU=====');
        console.log('1.Menu Organização');
        console.log('2.Menu Propriedade ');
        console.log('3.Sair do sistema');

        escolhaPrincipal = parseInt(teclado.question('Escolha uma opcao do menu: '));
        console.log('--\n');

        switch (escolhaPrincipal) {
            case 1:
                menuOrganizacao();
                break;
            case 2:
                menuPropriedade();
                break;
            case 3:
                console.log('Programa finalizado!');
                break;
            default:
                console.log('Opcao Invalida! Tente novamente.');
        }

        console.log('\n\n');
    } while(escolhaPrincipal !=3 );
}

function menuPropriedade() {
    let escolhaPropriedade;

    do {
        console.log('=====MENU PROPRIEDADE=====');
        console.log('1.Cadastre uma propriedade');
        console.log('2.Alterar propriedades');
        console.log('3.Exclua uma propriedade');
        console.log('4.Consulta de propriedades');
        console.log('5.Voltar para menu principal');

        escolhaPropriedade = parseInt(teclado.question('Escolha uma opção do menu: '));
        console.log('--\n');

        switch (escolhaPropriedade) {
            case 1:
                cadastrarPropriedade();
                break;
            case 2:
                alterarPropriedade();
                break;
            case 3:
                excluirPropriedade();
                break;
            case 4:
                let inCpf = teclado.question("Informe o CPF do Agricultor: ");
                consultarPropriedade(inCpf);
                break;
            case 5:
                menuPrincipal();
                console.log('voltando para o menu principal');    
                break;
            default:
                console.log('Opcao Invalida! Tente novamente.');
        }

        console.log('\n');
    } while (escolhaPropriedade!=5);
}

function menuOrganizacao() {

    let escolhaOrganizacao;

    do {
        console.log('=====MENU ORGANIZACAO=====');
        console.log('1.Cadastre uma organizacao');
        console.log('2.Alterar organizacao');
        console.log('3.Excluir uma organizacao');
        console.log('4.Consultar de organizacao');
        console.log('5.Voltar para menu principal');

        escolhaOrganizacao = parseInt(teclado.question('Escolha uma opcao do menu: '));
        console.log('--\n');

        switch (escolhaOrganizacao) {
            case 1:
                cadastrarOrganizacao();
                break;
            case 2:
                alterarOrganizacao();
                break;
            case 3:
                excluirOrganizacao();
                break;
            case 4:
                let cnpjBusca = teclado.question("Informe o CNPJ da Organizacao: ");
                let resultado = consultarOrganizacao(cnpjBusca);
                if (resultado){
                    console.log('====Dados da organizacao====');
                    console.log('Nome: ' + resultado.nome);
                    console.log('CNPJ: ' + resultado.cnpj);
                    resultado.nome = "ifpe";
                }else{
                    console.log("Organizaão não encontrada. ")
                }
                break;
            case 5:
                menuPrincipal();
                console.log('voltando para o menu principal');    
                break;
            default:
                console.log('Opcao Invalida! Tente novamente.');
        }

        console.log('\n\n');
    } while (escolhaOrganizacao != 5);
}

// Crud organização
function cadastrarOrganizacao() {
    let nomeOrganizacao = teclado.question("Informe o nome da Organizacao: ");
    let cnpjOrganizacao = teclado.question("Informe o CNPJ da Organizacao: ");

    const objOrganizacao = {
        nome: nomeOrganizacao,
        cnpj: cnpjOrganizacao,
    };

    lista_de_organizacoes.push(objOrganizacao);
    console.log('Organizacao cadastrada com sucesso!');
}


function consultarOrganizacao(cnpjBusca) {
    //CNPJ da Organizacao é a chave que vamos utilizar para buscar e remover uma organizacao

    for (let i = 0; i < lista_de_organizacoes.length; i++) {
        let cnpjDaOrganizacao = lista_de_organizacoes[i].cnpj;

        if (cnpjBusca == cnpjDaOrganizacao) {
            return lista_de_organizacoes[i];   
        } 
    }
    return null;
}


menuPrincipal();