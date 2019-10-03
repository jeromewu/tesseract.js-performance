const { TesseractWorker } = require('tesseract.js');

const worker = new TesseractWorker({
  cachePath: '../',
  cacheMethod: 'readOnly',
});

(async () => {
  let total = 0;
  for (let i = 0; i < 10; i++) {
    const start = new Date();
    const { text } = await worker.recognize('../testocr.jpg', 'eng');
    const diff = new Date() - start;
    console.log(`Complete ${i+1}/10, execution time=${diff}ms`);
    total += diff
  }
  console.log(`Total execution time=${total / 1000}s`);
  worker.terminate();
})();

