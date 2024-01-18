import { Worker } from 'bullmq'
import { redisConnection } from '../config'
import { sendEmail } from '../utils'


const worker = new Worker("email-queue", async (job) => {
    console.log("job.data ===", job.data)
    await sendEmail()
}, { connection: redisConnection })

worker.on("completed", (job) => {
    console.log("✅ completed ===", job.id)
})


worker.on("failed", (job, error) => {
    console.log(`❌error in job ${job?.id}  -- ${error} `)
})


