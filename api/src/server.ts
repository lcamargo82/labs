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

server.post('/tickets-faturados', async (request) => {
  const createTicketSchema = z.object({
    invoiced: z.boolean()
  });

  const { invoiced } = createTicketSchema.parse(request.body);

  const tickets = await prisma.ticket.findMany({
    where: {
      invoiced: invoiced,
      isIntegrad: true
    }
  })

  return { tickets };
})

server.post('/tickets-integrado', async (request, replay) => {
  const createTicketSchema = z.object({
    id: z.string()
  });

  const { id } = createTicketSchema.parse(request.body);

  await prisma.ticket.update({
    where: { 
      id
    },
    data: { 
      isIntegrad: true
    }
  })

  return replay.status(204).send();
})

server.post('/tickets', async (request, replay) => {
  console.log(request.body)
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

  return replay.status(201).send();

})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
});