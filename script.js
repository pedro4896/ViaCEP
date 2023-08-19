// promise: resposta da requisição
// then: É quando a promise é resolvida
// catch: É quando a promise é rejeitada
// finally: Ocorre quando a requisição encerra independente se foi then ou catch

/*var consultaCEP = fetch('https://viacep.com.br/ws/55158230/json/')
    .then(resposta => resposta.json()) // converte a response em um json
    .then(r => { 
        if(r.erro){
            throw Error('Esse cep não existe!')
        }else{
            console.table(r)
        }
    })
    .catch(erro => console.log(erro)) // trata o erro na requisição
    .finally(mensagem => console.log('Processamento concluido!'));
*/

    //Outro método de requisições assincronas
    async function buscaEndereco(cep){
        var mensagemErro = document.getElementById('erro');
        mensagemErro.innerHTML = "";
        try{ // resposta da promise
            let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            let consultaCEPConvertida = await consultaCEP.json()
            if(consultaCEPConvertida.erro){
                throw Error('CEP não exitente!');
            }

            let cidade = document.getElementById('cidade')
            let logradouro = document.getElementById('endereco')
            let estado = document.getElementById('estado')
            let bairro = document.getElementById('bairro')
            
            cidade.value = consultaCEPConvertida.localidade
            bairro.value = consultaCEPConvertida.bairro
            logradouro.value = consultaCEPConvertida.logradouro
            estado.value = consultaCEPConvertida.uf

            console.log(consultaCEPConvertida)
            return consultaCEPConvertida;
        }catch(erro){
            mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
            console.log(erro)
        }
    }

    let cep = document.getElementById('cep')
    cep.addEventListener("focusout",() => buscaEndereco(cep.value))

    /*//Fazer várias requisições ao mesmo tempo
    let ceps = ['01001000','01001001']
    let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
    Promise.all(conjuntoCeps).then(respostas => console.log(respostas));*/