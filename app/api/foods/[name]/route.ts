import { data } from "../../../data/louann";
// import { data } from "../../../data/carla";

export async function GET(
    request: Request,
    { params }: { params: { name: string }}
) {
    console.log('ok');
    console.log("params.name:", params.name);
    console.log("data array:", data);

    const index = data.findIndex(
        (food) => food.name.toLowerCase().replace(/ /g, '-') === params.name
    );
    
    console.log("Matched index:", index);
    console.log("Matched food:", data[index]);

    if (index !== -1) {
        return new Response(JSON.stringify(data[index]), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });
    } else {
        return new Response("Food not found.", {
            headers: {
                "Content-Type": "application/json"
            },
            status: 404
        });
    }
}
