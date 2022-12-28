import { Knex } from 'knex'

export async function seed(knex: Knex) {
    await knex('items').insert([
        {title: 'Lâmpadas', image: 'lampada.svg'},
        {title: 'Pilhas e Baterias', image: 'pilha.svg'},
        {title: 'Componentes Eletrônicos', image: 'eletronico.svg'}
    ])
}