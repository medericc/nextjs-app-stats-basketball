import { data  } from "../../../data/louann";

export async function GET() {
    return Response.json(data)
}