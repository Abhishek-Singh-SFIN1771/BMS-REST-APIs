import { createExpressServer, useContainer } from "routing-controllers";
import Container from "typedi";
import { BookController } from "./Controller/book-controller";
import { GlobalError } from "./Middleware/global-error-handler";

useContainer(Container);

export const app = createExpressServer(
    {
        controllers: [BookController],
        middlewares: [GlobalError],
        defaultErrorHandler: false
    })