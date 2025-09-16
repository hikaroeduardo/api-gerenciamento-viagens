import fastify from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
} from "fastify-type-provider-zod";

import { createUserRoute } from "./routes/users/create-user";

const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createUserRoute);

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    console.log("Server is running!");
});
