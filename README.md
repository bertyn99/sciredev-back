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

**The resume of the clean archi and how it is implemented in this project**
 
 **Resume**
The concept is to seperate the main part off the app while respecting the SOLID architecture.

In this case we have the User Side the Bussiness Logic and The server side (I CALL Metier).

In métier we code the usecases and ower domain. And every other dependancy will converge to this part. Server side dependency and User Side will converge to Metier. But they don't interact directly with the Metier there are port for that.

**Current implementation**

The code is separeted in modules. Itch module has an adapter , metier and port repository.
- Adapter
  This is the implementation of the featurs user side and server side. 
- Port:
  Adapters and usecases interact thanks to port with are just Interface.
- metier:
  hier we have our domain ; eg user.ts. It define the heart of the feature (what is a user , what can a user do? ).
  Then we have the service wich ise our usecase. We use `@Injectable()` to tell to nestjs that it is our service.
  Every adapter will depend on the service.
  If the controllerAdapter want to make a request the service will have a methode for it. 
  BUT the adapters and the service don't interact with each other , they use the port.

This way the controller is separated from the metier. The only method he is allowed to use are in the intarface that is injected in the controller.

That interface is implemented on the service , so the userService know what method to implement for it controller.

In the other hand the repository Adapter implement the userRepository interface witch is a port. That means the interface is infected on the service. The goal is to make the repository adapter 100% independent from the service. If we change the adapter her ; eg we change our db or the implementation of the request to the db change it only affect the repository adapter.

The usecase in the service stay pure and every part of the project is testable

Just need to tell to nestjs what class or interface are inject in what in the module file