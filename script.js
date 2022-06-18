
// Elementos HTML
const input = {
    min: window.document.getElementById('txt1id'),
    max: window.document.getElementById('txt2id'),
    howMany: window.document.getElementById('txt3id')
}

const radio = {
    includeMinAndMax: window.document.getElementsByName('radn'),
    repeatNumbers: window.document.getElementsByName('rad2n'),
    sortNumbers: window.document.getElementsByName('rad3n')
}

const res = window.document.getElementById('res')
 

// Funções
function randomNumbers() {

    // Declarando valores para o código ficar mais curto
    let Min = input.min.value
    let Max = input.max.value
    const HowMany = input.howMany.value


    // Se algum input estiver vazio
    if(Min.length === 0 || Max.length === 0 || HowMany.length === 0) return window.alert('Algum número está faltando!')

    // Se algum número é igual ao outro (menos o HowMany pq n precisa)
    if(Min === Max) return window.alert('Os números min. e max. n podem ser iguais!')


    // Verificando se o HowMany é muito grande
    if(Number(HowMany) > 41) return window.alert('O máximo de vezes possível é 41')


    
    // Se o min for maior q o max, eles trocam de valor
    if(Min > Max) {

        const menor = Max
        Max = Min
        Min = menor
    }


    // Se não for pra repetir números gerados
    if(radio.repeatNumbers[1].checked) {


        // Se for pra incluir o min e o max
        if(radio.includeMinAndMax[0].checked) {
         
            /* 
                Verificando se é possível gerar uma certa quantidade de números dependendo do min e do max, ex:
                    min: 1, max: 5, HowMany: 10
                    e não pode repetir

                Não dá, mas se pudesse repetir, daria
            */

            if(String(Number(Max) - Number(Min) - Number(HowMany)).includes('-') && String(Number(Max) - Number(Min) - Number(HowMany)) != '-1') return window.alert('Impossível gerar essa quantidade de números')
        }
        
        
        // Se não for pra incluir
        if(radio.includeMinAndMax[1].checked) {

            if(String(Number(Max) - Number(Min) - Number(HowMany)).includes('-')) return window.alert('Impossível gerar essa quantidade de números')
        }
    }    


    // Declarando valores
    const Numbers = []
    let generatedNumber = ''


    // Laço que vai gerar os números
    for(let i = 1; i <= Number(HowMany); i++) {
        

        // Se pode incluir o minimo e o máximo -- aq gera o número
        if(radio.includeMinAndMax[0].checked) {
            

            // Gerando um número que chega ao máximo
            generatedNumber = Math.floor(Math.random() * (Number(Max) + 1))


            // Se o número gerado for menor que o mínimo, retorna a função
            if(generatedNumber < Min) return randomNumbers()
            

        // Se não pode incluir o minimo e o máximo
        } else {


            // Gerando um número que não chega ao máximo
            generatedNumber = Math.floor(Math.random() * (Number(Max) - 1))


            // Se o número gerado for menor ou igual ao minimo, retorna a função
            if(generatedNumber <= Min) return randomNumbers()
        }


        // Se pode repetir os números gerados -- aq adiciona o número ao array
        if(radio.repeatNumbers[0].checked) {

            Numbers.push(generatedNumber)


        // Se não pode repetir
        } else {


            // Se o número gerado não está no array
            if(Numbers.includes(generatedNumber) === false) {

                // O número gerado é adicionado ao array
                Numbers.push(generatedNumber)


             // Se estiver, retorna a função
            } else return randomNumbers()
        }
    }


    // Se for pra ordenar o array do menor para o maior
    if(radio.sortNumbers[0].checked) {

        // Ele é ordenado
        Numbers.sort((a,b) => a-b)
        // ^^ N sei como ele funciona ^^
    }
    
    // Se for para ordenar do maior para o menor
    if(radio.sortNumbers[1].checked) {

        Numbers.sort((a,b) => a-b).reverse()
    }


    // Colocando os números na div de resultados
    res.innerHTML = Numbers
}


function clearRes() {

    // Trocando o valor da div
    res.innerHTML = 'Limpo!'
}
