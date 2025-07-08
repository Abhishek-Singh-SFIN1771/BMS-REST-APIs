import { createExpressServer, useContainer } from "routing-controllers";
import Container from "typedi";
import { BookController } from "./Controller/book-controller";

useContainer(Container);

export const app = createExpressServer(
    {
        controllers: [BookController],
        defaultErrorHandler: false
    })