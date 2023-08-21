<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Migration

```bash
# development
$ pnpm migration:generate

# Executer les migration
$ pnpm migration:run
```


## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Archi hexa

**The ressource I used**

- [how to use hexa archi on nest](https://towardsdev.com/nest-js-clean-code-using-hexagonal-architecture-3442a37a6e8e)

 - [Example of hexa archi and explication details abot ports and adapter](https://www.invivoo.com/architecture-hexagonale/)

 - [Concept explication ](https://blog.octo.com/architecture-hexagonale-trois-principes-et-un-exemple-dimplementation/)
 - [Throw and handling Error](https://blog.devops.dev/throw-like-a-pro-in-nestjs-6b4dca2b935c)
 - [Use Case/Port](https://medium.com/@maksim_smagin/3-steps-to-the-clean-code-nodejs-nestjs-project-tips-5857e0f39610#edcb)

**The resume of the clean archi and how it is implemented in this project**
 

 Currently we have 2 main folders:
  - module: This is the applications business layer, in this folder it will contain the existing business flows of the application in the form of use cases.
  - infrastructures : Contains frameworks and external tools, such as database, repository configuration and implementation.



 **Resume**
The concept is to seperate the main part off the app while respecting the SOLID architecture.

In this case we have the User Side the Bussiness Logic and The server side (I CALL Metier).

In métier we code the usecases and ower domain. And every other dependancy will converge to this part. Server side dependency and User Side will converge to Metier. But they don't interact directly with the Metier there are port for that.

**Architecture**
src/
├───infrastructure
│   ├───common
│   │   └───exception
│	  │	└───interceptor
│   ├───config
│   └───database
│       └───typeorm
└───modules
    └───user
        ├───adaptater
        ├───dto
        └───entities      
        └───usecase

**Current implementation**

The code is separeted in modules. Itch module has an adapter , metier and port repository.
- Adapter
  This is the implementation of the featurs user side and server side. 
- Port/Usecase:
  Adapters and usecases interact thanks to port with are just Interface.
- Service:
  here we have our domain ; eg user.ts. It define the heart of the feature (what is a user , what can a user do? ).
  Then we have the service wich ise our usecase. We use `@Injectable()` to tell to nestjs that it is our service.
  Every adapter will depend on the service.
  If the controllerAdapter want to make a request the service will have a methode for it. 
  BUT the adapters and the service don't interact with each other , they use the port.

This way the controller is separated from the metier. The only method he is allowed to use are in the intarface that is injected in the controller.

That interface is implemented on the service , so the userService know what method to implement for it controller.

In the other hand the repository Adapter implement the userRepository interface witch is a port. That means the interface is infected on the service. The goal is to make the repository adapter 100% independent from the service. If we change the adapter her ; eg we change our db or the implementation of the request to the db change it only affect the repository adapter.

The usecase in the service stay pure and every part of the project is testable

Just need to tell to nestjs what class or interface are inject in what in the module file

# Tests
## Unit tests
One of the most controversial subject in Software development is unit testing.

What and how should we test ?

Unit test should focus on the business value of your application: the use-cases.

They have to be really fast (< x0 ms) in order to iterate quickly on the algorithm we are working on.

In the outside world, we distinguish two approaches for unit testing: the Classicist vs the Mockist.

This project uses the classicist approach in order to focus on the result of the behavior of the use-cases and not on how the behavior has been implemented: this leads to more meaningful tests, with a lighter syntax.

So, use-cases are black-boxed tested with fake secondaries adapters injected at the beginning of the test suite.

I/O: A use-case.

![Alt text](doc/assets/image.png)

## Integration tests
Integration tests focuses on testing if tier services are well integrated with our system.

To have relevant integration test, we want to create a testing environment as close as possible to a production one.

For example, to test a repository, we will have a local database and make access to it as we would do in production.

This kind of environment can be easily setup thanks to docker containers.

They are slower than unit tests since they need an heavier environement. They usually takes up to < x00 ms.

I/O: A real secondaries adapters.

![Alt text](doc/assets/image-1.png)

## End-to-end tests
End-to-end tests focuses on testing a whole flow: one endpoint.

They use our use-cases and real adapters in order to check if the flow under test behave as expected.

They usually takes up from < x00 ms to < x000 ms.

It allows us to check if our endpoints are accessible from the outside world and what are their responses.

Those tests also wants to reproduce as possible a production enviroment, so they use the real implementations.

The services that are too weird to keep in the test (mailing for example) will be doubled by a fake implementation.

I/O: An endpoint.

![E22 testing](doc/assets/image-2.png)
