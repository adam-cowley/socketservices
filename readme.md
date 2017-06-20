# Socketservices

This project is intended to build on the principles of a Microservices architecture by creating a distributed stock control and ordering system connected together using websockets rather than HTTP calls.

As a HTTP call comes into the Gateway server, the appropriate services are contacted and the order process completed.

Socket.io allows each microservice to identify itself to the gateway server by joining it's own namespace.  If no nameservice exists the order process will fail and the gateway should handle the error.

Any microservice can be swapped out for another by writing a different implementation.

## Running Services

```
node gateway/index.js
node inventory/index.js
```

## TODO
- Microservices in other languages
- Service Implementations
- Dependency Injection for Services
- TODO's in Order Service and
