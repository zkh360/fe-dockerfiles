const Koa = require('koa');
const app = new Koa();
const path = require('path');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const SINGLEFILE_EXECUTABLE = './node_modules/single-file/cli/single-file';
const BROWSER_PATH = '/usr/bin/chromium-browser';
const BROWSER_ARGS = '["--no-sandbox"]';

app.use(async (ctx) => {
  if (!ctx.query['url']) {
    ctx.status = 400;
    ctx.body = 'Url need provided!';
  }
  try {
    const { stdout } = await execFile(
      path.resolve(__dirname, SINGLEFILE_EXECUTABLE),
      [
        '--browser-executable-path=' + BROWSER_PATH,
        '--browser-args=' + BROWSER_ARGS,
        ctx.query['url'],
        '--dump-content',
      ]
    );
    ctx.type = 'text/html';
    ctx.body = stdout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Error ocurred!';
  }
});

app.listen(3000);
