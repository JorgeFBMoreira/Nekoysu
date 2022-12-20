# NOTES.MD

This is a notes file made for myself. It might be confusing for others to follow along.
For now, it's just for myself, but I plan to do some different files which may explain how the whole bot works.

Currently, I'm using discord.js v14 (14.7.1).



## NEKOYSU!

Nekoysu! is a discord bot mainly focus on [osu!](https://osu.ppy.sh)



## TO START THE BOT
> node ./src/index.js
or
> npm run start:dev



## LIBRARIES

> npm i discord.js 
Or "npm i discord.js@latest" in case it doesn't come with the latest version of discord.js

> npm i -D nodemon
Every time a new change is made, it'll restart the program/process (in this case, the bot)
- Created a script called "start:dev" which runs nodemon on ./src/index.js:
> npm run start:dev


> npm i -D dotenv
Dotenv allows us to use enviroment variables, which ensure security (we don't want to place our raw tokens inside our program, otherwise it'll, easily, be compromissed)

> npm i @discordjs/rest
Take care to call the discord API for us



## Other notes
package.json
```js
{
    ...
    "type": "module"
}
```
- Allows us to use the most recent features