const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/bd');
const methodOverride = require('method-override');

const { Jogo, genero, desenvolvedoras } = require('./models');

const app = express();

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.engine('handlebars', exphbs.engine({
    defaultLayout: false
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        titulo: 'Página Inicial'
    });
});

app.get('/Jogo', async (req, res) => {
    try {
        const jogo = await Jogo.findAll({
            include: [
                {
                    model: genero,
                    as: 'genero'
                }
            ],
            raw: true,
            nest: true
        });

        console.log(jogo);

        res.render('ListarJogos', {
            jogo
        });
    } catch (erro) {
        console.log('ERRO COMPLETO:', erro);
        res.send(erro.message);
    }
});

app.get('/Devs', async (req, res) => {
    const Devs = await desenvolvedoras.findAll({ raw: true });

    res.render('ListarDesenvolvedoras', {
        Devs
    });
});

app.get('/Generos', async (req, res) => {
    const Generos = await genero.findAll({ raw: true });

    res.render('ListarGeneros', {
        Generos
    });
});

app.get('/Jogo/cadastrar', async (req, res) => {
    const Generos = await genero.findAll({ raw: true });

    res.render('cadastrarJogos', {
        Generos
    });
});

app.get('/Devs/cadastrar', (req, res) => {
    res.render('cadastrarDesenvolvedoras');
});

app.get('/genero/cadastrar', (req, res) => {
    res.render('cadastrarGenero');
});

app.post('/Jogo', async (req, res) => {
    console.log(req.body);

    const nome = req.body.nome;
    const anoDeLancamento = req.body.anoDeLancamento;
    const generoID = req.body.generoID;
    const avaliacao = req.body.avaliacao;

    await Jogo.create({
        nome: nome,
        anoDeLancamento: anoDeLancamento,
        generoID: generoID,
        avaliacao: avaliacao
    });

    res.redirect('/Jogo');
});

app.post('/Desenvolvedoras', async (req, res) => {
    const nome = req.body.nome;
    const capital = req.body.capital;

    await desenvolvedoras.create({
        nome: nome,
        capital: capital
    });

    res.redirect('/Devs');
});

app.post('/Generos', async (req, res) => {
    console.log('DADOS RECEBIDOS:', req.body);

    const nome = req.body.nome;

    const novoGenero = await genero.create({
        nome: nome
    });

    console.log('GENERO CRIADO:', novoGenero.toJSON());

    res.redirect('/Generos');
});

app.put('/Jogo/:id', async (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const anoDeLancamento = req.body.anoDeLancamento;
    const generoID = req.body.generoID;
    const avaliacao = req.body.avaliacao;

    const jogo = await Jogo.findByPk(id);

    jogo.nome = nome;
    jogo.anoDeLancamento = anoDeLancamento;
    jogo.generoID = generoID;
    jogo.avaliacao = avaliacao;

    await jogo.save();

    res.redirect('/Jogo');
});

app.put('/genero/:id', async (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;

    const generoEncontrado = await genero.findByPk(id);

    generoEncontrado.nome = nome;

    await generoEncontrado.save();

    res.redirect('/Generos');
});

async function conectarBD() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        console.log(
            'Conexão com o banco de dados estabelecida com sucesso!'
        );
    } catch (erro) {
        console.error('Erro ao conectar:', erro);
    }
}

conectarBD();

app.listen(3000, () => {
    console.log('Servidor executando em http://localhost:3000');
});