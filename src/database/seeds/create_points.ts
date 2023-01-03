import { Knex } from 'knex'

export async function seed(knex: Knex) {
    await knex('points').insert([
        {name: 'Ponto de Coleta Curitiba',      email: 'coleta.curitiba@gmail.com',         whatsapp: '41997635882', latitude: '-25.4626893', longitude: '-49.2419996', city: 'Curitiba',    uf: 'PR', street: 'Av. Sete de Setembro',              neighborhood: 'Batel',       complement: '4987', token: '1'},
        {name: 'Coleta São José',               email: 'coleta.sao.jose@gmail.com',         whatsapp: '41997635882', latitude: '-25.5505227', longitude: '-49.1814734', city: 'Curitiba',    uf: 'PR', street: 'R. Cândido Alves da Rocha',         neighborhood: 'Cruzeiro',    complement: '682',  token: '2'},
        {name: 'Coletas Cajuru',                email: 'coletas.cajuru@gmail.com',          whatsapp: '41997635882', latitude: '-25.4516255', longitude: '-49.252419', city: 'Curitiba',     uf: 'PR', street: 'R. Teófilo Otoní',                  neighborhood: 'Cajuru',      complement: '638',  token: '3'},
        {name: 'Coletas Paraná',                email: 'coletas.parana@gmail.com',          whatsapp: '41997635882', latitude: '-25.4428963', longitude: '-49.2534166', city: 'Curitiba',    uf: 'PR', street: 'Av. Presidente Affonso Camargo',    neighborhood: 'Cristo Rei',  complement: '2491', token: '4'},
        {name: 'Centro Coletas Eletrônicos',    email: 'centro.coleta@gmail.com',           whatsapp: '41997635882', latitude: '-25.4369036', longitude: '-49.2679115', city: 'Curitiba',    uf: 'PR', street: 'Av. Visc. de Guarapuava',           neighborhood: 'Centro',      complement: '2945', token: '5'}
    ])
}