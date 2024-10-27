const listaDeCachacas = [
    { nome: "Cachaça Salinas", teor: "42%" },
    { nome: "Ypioca Ouro", teor: "39%" },
    { nome: "Cachaça Cabaré", teor: "38%" },
    { nome: "Cachaça Leblon", teor: "40%" },
    { nome: "Velho Barreiro", teor: "39%" },
    { nome: "Cachaça Reserva 51", teor: "40%" },
    { nome: "Sagatiba", teor: "38%" },
    { nome: "Seleta", teor: "42%" },
    { nome: "Cachaça Princesa Isabel", teor: "40%" },
];

function Cabecalho() {
    return <h1>Minha Tabela de Cachaças</h1>;
}

function ArrayTabelaBebidas() {
    const [showTable, setShowTable] = React.useState(true);

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    const returnToInitialView = () => {
        setShowTable(true);
    };

    return (
        <div>
            {showTable ? (
                <div>
                    <table id="tabela" border="1">
                        <thead>
                            <tr><th>Nome</th><th>Teor Alcoólico</th></tr>
                        </thead>
                        <tbody>
                            {listaDeCachacas.map((cachaca, index) => (
                                <tr key={index}>
                                    <td>{cachaca.nome}</td>
                                    <td>{cachaca.teor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button id="comeback" onClick={toggleTable}>Voltar</button>
                </div>
            ) : (
                <div>
                    <Cabecalho />
                    <button onClick={returnToInitialView}>Mostrar Tabela</button>
                </div>
            )}
        </div>
    );
}

function App() {
    const handleButtonClick = () => {
        ReactDOM.render(
            <ArrayTabelaBebidas />,
            document.getElementById("app")
        );
    };

    return (
        <div>
            <Cabecalho />
            <button onClick={handleButtonClick}>Mostrar Tabela</button>
        </div>
    );
}