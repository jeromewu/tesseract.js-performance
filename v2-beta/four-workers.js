const { createWorker, createScheduler, OEM } = require('tesseract.js');

const scheduler = createScheduler();

(async () => {
  for (let i = 0; i < 4; i++) {
    const w = createWorker({
      cachePath: '..',
      cacheMethod: 'readOnly',
    });
    await w.load();
    await w.loadLanguage('eng');
    await w.initialize('eng', OEM.LSTM_ONLY);
    scheduler.addWorker(w);
  }
  const start = new Date();
  const rets = await Promise.all(Array(10).fill(0).map(() => (
    scheduler.addJob('recognize', '../testocr.jpg');
  )));
  console.log('Complete 10/10');
  console.log(`Total execution time=${(new Date() - start) / 1000}s`);
  await scheduler.terminate();
})();
