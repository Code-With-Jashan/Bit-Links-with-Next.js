import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    // Validate inputs
    if (!body.url || !body.shorturl) {
      return Response.json(
        { success: false, error: true, message: "URL and shorturl are required!" },
        { status: 400 }
      )
    }

    // Check if the short URL already exists
    const doc = await collection.findOne({ shorturl: body.shorturl })
    if (doc) {
      return Response.json(
        { success: false, error: true, message: "Short URL already exists!" },
        { status: 400 }
      )
    }

    // Insert into DB
    await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
      createdAt: new Date(),
    })

    return Response.json(
      { success: true, error: false, message: "URL generated successfully!" },
      { status: 200 }
    )
  } catch (err) {
    console.error("API Error:", err)
    return Response.json(
      { success: false, error: true, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
