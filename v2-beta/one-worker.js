const { createWorker, OEM } = require('tesseract.js');

const worker = createWorker({
  cachePath: '..',
  cacheMethod: 'readOnly',
});

(async () => {
  let total = 0;
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng', OEM.LSTM_ONLY);
  for (let i = 0; i < 10; i++) {
    const start = new Date();
    const { data: { text } } = await worker.recognize('../testocr.jpg');
    const diff = new Date() - start;
    console.log(`Complete ${i+1}/10, execution time=${diff}ms`);
    total += diff;
  }
  console.log(`Total execution time=${total / 1000}s`)
  await worker.terminate();
})();
