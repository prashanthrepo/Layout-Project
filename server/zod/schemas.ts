import { z } from "zod"

const locationSchema = z.object({
    long: z.number(),
    lat: z.number(),
})

const infoSchema = z.object({
    text: z.string(),
    transform: z.string(),
    type: z.string(),
})

const leadSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

const siteSchema = z.object({
    type: z.string(),
    number: z.string(),
    status: z.string(),
    points: z.string(),
    info: z.array(infoSchema),
    customPrice: z.string().optional(),
    defaultPrice: z.string().optional(),
    leads: z.array(leadSchema).optional(),
    dimensions: z.string().optional(),
    area: z.string().optional(),
})
const layoutSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    location: locationSchema,
    layoutJSON: z.array(siteSchema),
})

export { infoSchema, layoutSchema, leadSchema, locationSchema, siteSchema }
