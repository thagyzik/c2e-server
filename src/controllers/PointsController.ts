import {Request, Response} from 'express'
import knex from '../database/connection'

class PointsController{
    async index (request: Request, response: Response) {
        const {city, uf, items} = request.query

        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')

        const serializedPoints = points.map(point => {
            return {
                ...point
            }
        })

        return response.json(serializedPoints)
    }

    async show (request: Request, response: Response) {
        const { id } = request.params

        const point = await knex('points').where('id', id).first()

        if(!point) {
            return response.status(400).json({message: 'Ponto não encontrado.'})
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        const serializedPoint = {
            ...point
        }
        

        return response.json({ point: serializedPoint, items })
    }

    async create (request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            street,
            neighborhood,
            complement,
            token,
            items
        } = request.body
    
        const trx = await knex.transaction()

        const point = {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            street,
            neighborhood,
            complement,
            token
        }

        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
    
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
    
        await trx('point_items').insert(pointItems)

        await trx.commit()
    
        return response.json({
            id: point_id,
            ...point,
        })
    }

    async update (request: Request, response: Response) {

        const {
            name,
            email,
            whatsapp,
            street,
            neighborhood,
            complement,
        } = request.body
    
        const trx = await knex.transaction()

        const pointUpdate = {
            name,
            email,
            whatsapp,
            street,
            neighborhood,
            complement,
        }

        const { id } = request.params

        await trx('points').update(pointUpdate).where('id', id)

        await trx.commit()

        const serializedPoint = {
            ...pointUpdate
        }
        
        return response.json({ serializedPoint })
    }

    async delete (request: Request, response: Response) {

        const { id } = request.params

        await knex('points').del().where('id', id)

        const point = await knex('points').where('id', id).first()

        if(!point) {
            return response.status(200).json({message: 'Ponto deletado.'})
        } else {
            return response.status(400).json({message: 'Ocorreu um erro ao tentar deletar ponto'})
        }
    }
}

export default PointsController