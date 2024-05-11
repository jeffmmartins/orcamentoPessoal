class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
      this.ano = ano;
      this.mes = mes;
      this.dia = dia;
      this.tipo = tipo;
      this.descriçao = descricao;
      this.valor = valor;
    }
  
    validarDados() {
      for (let i in this) {
        if (this[i] == undefined || this[i] == "null" || this[i] == "") {
          return false;
        }
      }
      return true;
    }
  }
  
  class Bd {
    constructor() {
      let id = localStorage.getItem("id");
  
      if (id === null) {
        localStorage.setItem("id", 0);
      }
    }
  
    getProximoId() {
      let proximoId = localStorage.getItem("id");
      console.log(proximoId)
      return parseInt(proximoId) + 1; //convertendo uma string em um numero 
    }
  
    gravar(d) {
      let id = this.getProximoId(); // utilizado o this porque o metodo faz parte do proprio objeto em questao 
      localStorage.setItem(id, JSON.stringify(d));
      localStorage.setItem("id", id);
    }
  
    recuperarTodosRegistros() {

      //array de despesa
      let despesas = Array()

      let id = localStorage.getItem("id");
  
      // Recuperar todas as despesas cadastradas em localStorage
      for (let i = 1; i <= id; i++) {
        let despesa = JSON.parse(localStorage.getItem(i))
  
        //verificar a possibilidades de haver indices que foram removidos 
        if (despesa === null) {
          continue
        }
  
        despesas.push(despesa)
      }
      return despesas
    }
  }
  
  let bd = new Bd();
  
  function cadastrarDespesa() {
    let ano = document.getElementById("ano");
    let mes = document.getElementById("mes");
    let dia = document.getElementById("dia");
    let tipo = document.getElementById("tipo");
    let descricao = document.getElementById("descricao");
    let valor = document.getElementById("valor");
  
    let despesa = new Despesa(
      ano.value,
      mes.value,
      dia.value,
      tipo.value,
      descricao.value,
      valor.value
    );
  
    // falta fazer o modal
    if (despesa.validarDados()) {
      bd.gravar(despesa); // chamando o objeto bd e na sequencia executando o metodo gravar
      alert("Registro cadastrado com sucesso");
    } else {
      alert("Erro");
    }
  }
  
    function carregaListaDespesa() {
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros();
    console.log(despesas)
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    /*
    <tr> 
            <!--Colunas de uma tabela -->
            <td>15/03/2024</td>  
            <td>Alimentação</td>
            <td>Compras do Mês</td>
            <td>444,75</td>
    </tr>
     */

    // percorrer o array despesas, listando cada array de forma dinamica
    despesas.forEach((d) => {
      // criando a linha (tr), esse metodo é a inserção de linhas
      let linha =  listaDespesas.insertRow()
      // criar colunas (td)
      linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

      //ajustar o tipo
      switch(d.tipo) {
        case '1': d.tipo = 'Alimentação'
        break
        case '2': d.tipo = 'Educação'
        break
        case '3': d.tipo = 'Lazer'
        break
        case '4': d.tipo = 'Saúde'
        break
        case '5': d.tipo = 'Transporte'
        break
      }

      linha.insertCell(1).innerHTML = d.tipo
      linha.insertCell(2).innerHTML = `${d.descriçao}`
      linha.insertCell(3).innerHTML = `${d.valor}`
    })
    
  };
  