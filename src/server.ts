import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
    return { ok: true };
});

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    console.log("Server is running!");
});
