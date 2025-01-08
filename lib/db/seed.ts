import { waitlistTemplates } from "./schema"
import { db } from "@/lib/db"
import { waitlistTemplatesData } from "./waitlistTemplates-data"
import { config } from "dotenv"

config({ path: ".env" })

export async function seedWaitlistTemplates() {
  console.log("🗑️  Clearing existing waitlist templates...")
  await db.delete(waitlistTemplates).execute()
  console.log("✨ Database cleared successfully")

  console.log("\n📥 Starting to insert new templates...")
  await db.insert(waitlistTemplates).values(waitlistTemplatesData)
  console.log("✅ New templates inserted successfully")
}

seedWaitlistTemplates()
  .then(() => {
    console.log("\n📊 Seeding Summary:")
    console.log("------------------")
    console.log(`Total templates inserted: ${waitlistTemplatesData.length}`)
    console.log("\n📝 Template Details:")
    waitlistTemplatesData.forEach((template, index) => {
      console.log(`  ${index + 1}. ${template.title}`)
      console.log(`     Category: ${template.category}`)
      console.log(`     Status: ${template.status}`)
      console.log(`     Link: ${template.link}`)
      console.log(`     Description: ${template.description}`)
      console.log("     ------------------")
    })
    console.log("\n✨ Database seeding completed successfully!")
  })
  .catch((error) => {
    console.error("\n❌ Database seeding failed!")
    console.error("Error details:")
    console.error("------------------")
    console.error(error)
    console.error("\n🚨 Exiting process with error...")
    process.exit(1)
  })
