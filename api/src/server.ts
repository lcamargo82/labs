import { PrismaClient } from "@prisma/client";
import { fastify } from "fastify";
import { z } from 'zod';

const server = fastify();

const prisma = new PrismaClient()

server.get('/', async () => {
  return 'Hello World!';
})

server.get('/tickets', async () => {
  const tickets = await prisma.ticket.findMany()

  return { tickets };
})

server.get('/tickets-faturados', async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      invoiced: true,
      isIntegrad: false
    }
  })

  return { tickets };
})

server.put('/tickets-integrado/:id', async (request, reply) => {
  const createTicketSchema = z.object({
    id: z.string()
  });

  const { id } = createTicketSchema.parse(request.params);

  await prisma.ticket.update({
    where: { 
      id
    },
    data: { 
      isIntegrad: true
    }
  })

  return reply.status(204).send();
})

server.post('/tickets', async (request, reply) => {
  const createTicketSchema = z.object({
    product: z.number(),
    codTransporter: z.number(),
    ticket: z.number(),
    value: z.number(),
    weight: z.number(),
    invoiced: z.boolean()
  });

  const { product, codTransporter, ticket, value, weight, invoiced } = createTicketSchema.parse(request.body)

  await prisma.ticket.create({
    data: {
      product, 
      codTransporter, 
      ticket, 
      value, 
      weight,
      invoiced
    }
  })

  return reply.status(201).send();

})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
});