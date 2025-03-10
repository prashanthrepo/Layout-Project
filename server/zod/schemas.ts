import { z } from "zod"

const locationSchema = z.object({
    long: z.number(),
    lat: z.number(),
})

const coordinateSchema = z.array(z.object({
    long: z.number(),
    lat: z.number(),
}))

const infoSchema = z.object({
    text: z.string(),
    transform: z.string(),
    type: z.string(),
})

const leadSchema = z
    .object({
        siteId: z.string().optional(),
        layoutId: z.string().optional(),
        name: z.string(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        buyerOffer: z.number().optional(),
        sellerOffer: z.number().optional(),
        finalPrice: z.number().optional(),
        notes: z.string().optional(),
        status: z.string().optional(),
    })
    .refine(
        data => {
            return (
                (data.siteId !== undefined && data.siteId !== "") !==
                (data.layoutId !== undefined && data.layoutId !== "")
            )
        },
        {
            message:
                "Either 'siteId' or 'layoutId' should be present, but not both.",
        }
    )

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
    coordinates: coordinateSchema ,
    approvals: z.array(z.string()).optional(),
    layoutJSON: z.array(siteSchema),
    user: z.string()
})


const apartmentSchema = z.object({
    user: z.string(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    location: locationSchema,
    coordinates: coordinateSchema ,
    approvals: z.array(z.string()).optional(),
    
})


const tokenSchema = z.object({
    site: z.string(),
    lead: z.string(),
    tokenAmount: z.number(),
    validity: z.number().optional(),
})
const transactionSchema = z.object({
    site: z.string(),
    type: z.string(),
    metadata: z.any(),
})

export {
    infoSchema,
    layoutSchema,
    leadSchema,
    locationSchema,
    siteSchema,
    tokenSchema,
    transactionSchema,
    apartmentSchema
}
