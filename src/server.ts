import fastify from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import { loginRoute } from "./routes/auth/login";
import { createUserRoute } from "./routes/users/create-user";
import { getProfileRoute } from "./routes/users/get-profile";

const app = fastify();

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Gerenciamento de Frotas",
            description:
                "API destinada para gerenciamento de frotas de uma organização.",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// auth route
app.register(loginRoute);

// user routes
app.register(createUserRoute);
app.register(getProfileRoute);

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.log(err.message);
        process.exit(1);
    }

    console.log("Server is running!");
});
