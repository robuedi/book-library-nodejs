import AuthorsStoreRequest from "../requests/api/v1/AuthorsStoreRequest"
import { Container } from "inversify"

const container = new Container()

//bindings
container.bind<AuthorsStoreRequest>(AuthorsStoreRequest).toSelf()

export default container


 