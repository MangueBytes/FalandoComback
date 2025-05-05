const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/teste', (req, res) => {
  console.log("--------ok--------");
  res.send('Ok');
});

// Nova rota para buscar CEP
app.get('/cep/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const cepNumerico = cep.replace(/\D/g, '');
    
    if (cepNumerico.length !== 8) {
      return res.status(400).json({ error: 'CEP deve conter 8 dígitos' });
    }

    // Simulando dados de CEP (na prática, você poderia buscar em um banco de dados)
    const ceps = {
      '01002000': {
        cep: '01002-000',
        logradouro: 'Rua Direita',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP'
      },
      '20040000': {
        cep: '20040-000',
        logradouro: 'Rua Primeiro de Março',
        bairro: 'Centro',
        localidade: 'Rio de Janeiro',
        uf: 'RJ'
      }
    };

    const resultado = ceps[cepNumerico];
    
    if (!resultado) {
      return res.status(404).json({ error: 'CEP não encontrado' });
    }

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');