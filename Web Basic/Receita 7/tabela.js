export const criarTabela = (itens, cabecalho, props) => {
    let tabela = `<table border="1">
        <thead>
            <tr>
                ${cabecalho.map(header => `<th>${header}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${itens.map(item => 
                `<tr>
                    ${props.map(prop => `<td>${item[prop] || 'N/A'}</td>`).join('')}
                </tr>`).join('')}
        </tbody>
    </table>`;

    return tabela
}