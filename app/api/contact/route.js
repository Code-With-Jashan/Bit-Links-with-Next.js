// app/api/contact/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("contact");

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, message: "Message sent successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: "Server error. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
