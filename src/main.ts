import bot from './bot/bot';

(async () => {
  await bot.start({
    onStart: (botInfo) => {
      const { username } = botInfo;
      console.info(`Bot starts as @${username}`);
    }
  });
})();
