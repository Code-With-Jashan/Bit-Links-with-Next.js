
import clientPromise from "@/lib/mongodb"

export async function POST(request) {

    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    // Validate inputs
    if (!body.url || !body.shorturl) {
      return Response.json(
        { success: false, error: true, message: "URL and shorturl are required!" },
        { status: 400 }
      )
    }

    //check if the short url exist
    const doc = await collection.findOne({shorturl: body.shorturl})
    if(doc){
        return Response.json({ success: false, error: true, message: 'Url already exists!' })
    }

    const result = await collection.insertOne({
        url:body.url,
        shorturl: body.shorturl
    })

  return Response.json({ success: true, error: false, message: 'Url Generated Successfully' })
}