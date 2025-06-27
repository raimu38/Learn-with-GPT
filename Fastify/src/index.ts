import Fastify from "fastify";

const app = Fastify();

app.get("/", async (request, reply) => {
  return { message: "Hello from Fastify + Typscript + Docker" };
});

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server ruunning at ${address}`);
});


const today:Date = new Date()

console.log(today)