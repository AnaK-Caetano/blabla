const teclado = require("readline-sync");

lista_de_propriedades = [];
lista_de_organizacoes = [];

//Funções de Propriedade
function cadastrarPropriedade() {
    let nomeAgricultor = teclado.question("Informe o nome do Agricultor: ");
    let cpfAgricultor = teclado.question("Informe o CPF do Agricultor: ");
    let enderecoPropriedade = teclado.question("Informe o endereco do terreno: ");
    let cnpjOrganizacao = teclado.question("Informe o CNPJ da Organizacao que vc faz parte: ");

    let existeNaLista = consultarOrganizacao(cnpjOrganizacao);

    if(!existeNaLista) {
        console.log('A organizacao nao existe! Vc nao pode concluir o cadastro.');
    } else {
        //CPF será uma chave para buscar os itens cadastrados
        const objPropriedade = {
            nome: nomeAgricultor,
            cpf: cpfAgricultor,
            cnpjDaOrganizacao: cnpjOrganizacao,
            endereco: enderecoPropriedade,

            mudarNome : function(novoNome) {
                this.nome = novoNome
            },

            mudarCpf : function(novoCpf) {
                this.cpf = novoCpf
            },

            mudarCnpj : function(novoCnpj) {
                this.cnpjDaOrnizacao = novoCnpj
            },
 
        };

        lista_de_propriedades.push(objPropriedade);
        console.log('Propriedade cadastrada com sucesso!\n\n');
    }
}

function consultarPropriedade(cpfDaBusca) {
    //CPF do Agricultor é a chave que vamos utilizar para buscar e remover uma propriedade

    for (let i = 0; i < lista_de_propriedades.length; i++) {
        let idPropriedade = lista_de_propriedades[i].cpf;

        if (cpfDaBusca == idPropriedade) {
            itemEncontrado = lista_de_propriedades[i];

            console.log('====Dados da propriedade====');
            console.log('Nome: ' + itemEncontrado.nome);
            console.log('Endereco: ' + itemEncontrado.endereco);
            return [true, i];
        } 
    }

    console.log('Item não encontrado.');
    return false;
}

function excluirPropriedade() {
    //CPF do Agricultor é a chave que vamos utilizar para buscar e remover uma propriedade
    if (lista_de_propriedades.length === 0) {
        console.log("Lista vazia, escolha outra opçao do menu");
        menuPropriedade();
    }

    let inCpfDaBusca = teclado.question("Informe o CPF do Agricultor: ");

    for (let i = 0; i < lista_de_propriedades.length; i++) {
        let cpfDoAgricultor = lista_de_propriedades[i].cpf;

        if (inCpfDaBusca == cpfDoAgricultor) {
            lista_de_propriedades.splice(i, 1);
            console.log('Propriedade com CPF vinulado ${cpfDoAgricultor} excluida!');
            return true;
        } 
    }

    console.log('Propriedade com CPF vinulado ${inCpfDaBusca} não encontrada.');
    return false;
}

function alterarPropriedade() {8

    if (lista_de_propriedades.length === 0) {
        console.log("Lista vazia, escolha outra opçao do menu");
        menuPropriedade();
    }

    let inCpfDaBusca = teclado.question("Informe o CPF vinculado com a propriedade: ");

    let resultadoDaBusca = consultarPropriedade(inCpfDaBusca);

    let existenciaPropriedade = resultadoDaBusca[0];

    if(existenciaPropriedade == true) {
        console.log("1.Alterar nome");
        console.log("2.Alterar CPF");
        console.log("3.Alterar Organizacao: ");
        
        let escolha = parseInt(teclado.question('Escolha uma opcao do menu: '));
        console.log('--\n\n');

        let propriedadeEncontrada = lista_de_propriedades[resultadoDaBusca[1]];

        switch(escolha) {
            case 1:
                let inNovoNome = teclado.question("Informe o novo nome: ");
                propriedadeEncontrada.mudarNome(inNovoNome);
                break;
            case 2:
                let inNovoCpf = teclado.question("Informe o novo CPF: ");
                propriedadeEncontrada.mudarCpf(inNovoCpf);
                break;
            case 3:
                let inNovoCnpj = teclado.question("Informe o novo CNPJ da sua organizacao: ");
                if(consultarOrganizacao(inNovoCnpj)[0]) {
                    propriedadeEncontrada.mudarCnpj(inNovoCnpj);
                }
                break;
            default:
                console.log('Opcao Invalida! Tente novamente.');
        }
    }

    console.log('\n\n');
}














//Funções de Organização


function consultarOrganizacao(cnpjBusca) {

    //CNPJ da Organizacao é a chave que vamos utilizar para buscar e remover uma organizacao

    for (let i = 0; i < lista_de_organizacoes.length; i++) {
        let cnpjDaOrganizacao = lista_de_organizacoes[i].cnpj;

        if (cnpjBusca == cnpjDaOrganizacao) {
            itemEncontrado = lista_de_organizacoes[i];

            console.log('====Dados da organizacao====');
            console.log('Nome: ' + itemEncontrado.nome);
            console.log('CNPJ: ' + itemEncontrado.cnpj);
            return [true, i];
        } 
    }

    console.log('Item não encontrado.');
    return [false, -1];
}

function excluirOrganizacao() {
    //CPF do Agricultor é a chave que vamos utilizar para buscar e remover uma propriedade
    if (lista_de_organizacoes.length === 0) {
        console.log("Lista vazia, escolha outra opçao do menu");
        menuOrganizacao();
    }

    let inCnpjDaBusca = teclado.question("Informe o CNPJ da Organizacao: ");

    for (let i = 0; i < lista_de_organizacoes.length; i++) {
        let cnpjDaOrganizacao = lista_de_organizacoes[i].cnpj;
        

        if (inCnpjDaBusca == cnpjDaOrganizacao) {
            lista_de_organizacoes.splice(i, 1);
            console.log('Organizacao de CNPJ: ${cnpjDaOrganizacao} excluida!');
            return true;
        } 
    }

    console.log('Organizacao de CNPJ: ${inCnpjDaBusca} não encontrada.');
    return false;
}

function alterarOrganizacao() {
    if (lista_de_propriedades.length === 0) {
        console.log("Lista vazia, escolha outra opçao do menu");
        menuPropriedade();
    }
}


function menuPrincipal() {
    let escolhaPrincipal;

    do {
        console.log('=====MENU=====');
        console.log('1.Menu Organização');
        console.log('2.Menu Propriedade ');
        console.log('3.Sair do sistema');

        escolhaPrincipal = parseInt(teclado.question('Escolha uma opcao do menu: '));
        console.log('--\n\n');

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
        console.log('--\n\n');

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
                let inCnpj = teclado.question("Informe o CNPJ da Organizacao: ");
                consultarOrganizacao(inCnpj);
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



menuPrincipal();